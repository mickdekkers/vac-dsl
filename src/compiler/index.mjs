import R from 'ramda'
import crc32 from 'crc-32'
import { morph, getCombinationsWith, combineAdjacentWith } from '../utils'
import { validateProperties, assocCommandProperties } from './properties'

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

// VAC has a limit on the number of characters in a device name
const capDeviceName = deviceName => deviceName.slice(0, 31).trim()
const capCommandDeviceNames = R.evolve({
  from: capDeviceName,
  to: capDeviceName
})

const getHash = str => (crc32.str(str) >>> 0).toString(16)

const addCommandHash = morph({ hash: ({ from, to }) => getHash(from + to) })

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

  return commands.map(R.pipe(capCommandDeviceNames, addCommandHash))
}
