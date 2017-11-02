import R from 'ramda'
import changeCase from 'change-case'
import { getCombinationsWith, combineAdjacentWith } from '../utils'

/**
 * Retrieve the value of an Identifier or Literal
 * @param variables - A map of variables and their values
 * @param idOrLiteral - A node whose type is Identifier or Literal
 */
const resolveValue = R.curry((variables, idOrLiteral) => {
  if (idOrLiteral.type === 'Literal') {
    return idOrLiteral.value
  } else {
    const value = variables[idOrLiteral.name]

    if (value == null) {
      // FIXME: maybe don't use ReferenceErrors
      throw new ReferenceError(`${idOrLiteral.name} is not defined`)
    }

    return value
  }
})

const connectionOf = (from, to) => ({ from, to })
const getConnections = getCombinationsWith(connectionOf)

const flattenEdges = R.pipe(
  combineAdjacentWith((left, right) => getConnections(left.nodes, right.nodes)),
  R.unnest
)

const applyProperties = R.curry((properties, command) => {
  const props = properties
    ? properties.reduce(
        (acc, prop) => (
          (acc[changeCase.pascalCase(prop.name)] = prop.value), acc
        ),
        {}
      )
    : {}
  return R.assoc('properties', props, command)
})

// TODO: refactor this
const resolveEdgeChainCommands = R.curry((variables, edgeChain) => {
  const { properties: { properties }, nodeLists } = edgeChain
  return flattenEdges(nodeLists).map(
    R.pipe(
      R.evolve({
        from: resolveValue(variables),
        to: resolveValue(variables)
      }),
      applyProperties(properties)
    )
  )
})

/**
 * Retrieve a list of connections to make from a vac-dsl program
 * @param program - The AST of a vac-dsl program
 */
export default program => {
  const { commands } = program.body.reduce(
    (acc, element, index) => {
      switch (element.type) {
        case 'VariableDefinition':
          acc.variables[element.id.name] = element.value.value
          break
        case 'Comment':
          break
        case 'EdgeChain':
          const edgeChainCommands = resolveEdgeChainCommands(
            acc.variables,
            element
          )
          acc.commands = acc.commands.concat(edgeChainCommands)
          break
        default:
          // TODO: better errors
          throw new Error(
            `Unknown AST element type ${element.type} at index ${index}`
          )
      }

      return acc
    },
    { variables: {}, commands: [] }
  )

  return commands
}
