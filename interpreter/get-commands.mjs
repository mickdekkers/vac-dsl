import R from 'ramda'
import dedent from 'dedent'
import changeCase from 'change-case'
import { getCombinationsWith, combineAdjacentWith } from '../utils'

/**
 * Resolve the value of an Identifier or Literal
 * @param variables - A map of variables and their values
 * @param idOrLiteral - A node whose type is Identifier or Literal
 * @returns The value associated with an Identifier or Literal
 * @throws {ReferenceError} if no value is defined for the Identifier
 */
const resolveValue = R.curry((variables, idOrLiteral) => {
  if (idOrLiteral.type === 'Literal') {
    return idOrLiteral.value
  } else {
    const value = variables[idOrLiteral.name]

    if (value == null) {
      // TODO: maybe don't use ReferenceErrors
      throw new ReferenceError(`${idOrLiteral.name} is not defined`)
    }

    return value
  }
})

/**
 * Resolve the values of the `{from, to}` properties of a command
 * @param variables - A map of variables and their values
 * @param command - A command object
 * @returns A command object with its `{from, to}` values resolved
 */
const resolveCommandValues = R.curry((variables, command) =>
  R.evolve({
    from: resolveValue(variables),
    to: resolveValue(variables)
  })(command)
)

const connectionOf = (from, to) => ({ from, to })
const getConnections = getCombinationsWith(connectionOf)

/**
 * Expand an EdgeChain object into its final commands
 * @param edgeChain - An EdgeChain object
 * @returns A list of commands defined by the EdgeChain
 */
const expandEdgeChain = R.pipe(
  R.prop('nodeLists'),
  combineAdjacentWith((left, right) => getConnections(left.nodes, right.nodes)),
  R.unnest
)

/**
 * Reduce a list of properties to a PascalCase formatted property object
 * @param properties - A list of property objects with `{name, value}` fields
 * @returns An object containing the properties
 */
const propertiesListToObject = properties => {
  if (properties == null) {
    return {}
  }

  return properties.reduce(
    (acc, prop) => R.assoc(changeCase.pascalCase(prop.name), prop.value, acc),
    {}
  )
}

/**
 * Associate a list of properties with a command
 * @param properties - A list of properties to associate with the command
 * @param command - A command object to associate the properties with
 * @returns A command object with a `properties` field containing the properties
 */
const assocCommandProperties = R.curry((properties, command) => {
  const props = propertiesListToObject(properties)

  return R.assoc('properties', props, command)
})

// TODO: refactor this
const allowedProperties = [
  'SamplingRate',
  'BitsPerSample',
  'Channels',
  'BufferMs',
  'Buffers',
  'Priority'
]
const validateProperties = properties => {
  if (properties == null) {
    return
  }

  properties.forEach(property => {
    const prop = property.name
    if (!allowedProperties.includes(changeCase.pascalCase(prop))) {
      throw new Error(dedent`
        Property "${prop}" is invalid.
        List of valid properties:
        ${allowedProperties
          .map(R.unary(changeCase.snakeCase))
          .map(ap => `- ${ap}`)
          .join('\n')}
      `)
    }
  })
}

/**
 * Retrieve a list of connections to make from a vac-dsl program
 * @param program - The AST of a vac-dsl program
 * @returns A list of connections to make
 */
export default program => {
  const { commands } = program.body.reduce(
    (acc, element, index) => {
      switch (element.type) {
        case 'VariableDefinition':
          acc.variables[element.id.name] = element.value.value
          break
        case 'EdgeChain':
          const { properties: { properties } } = element

          validateProperties(properties)

          const commands = expandEdgeChain(element).map(
            R.pipe(
              resolveCommandValues(acc.variables),
              assocCommandProperties(properties)
            )
          )

          acc.commands = acc.commands.concat(commands)
          break
        case 'Comment':
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
