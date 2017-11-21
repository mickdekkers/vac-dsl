import * as R from 'ramda'
import * as crc32 from 'crc-32'
import { AST, EdgeChain, Node, NodeList, Command } from '@vac-dsl/core'
import {
  morph,
  getCombinationsWith,
  combineAdjacentWith,
  Subset
} from '@vac-dsl/core'
import { validateProperties, assocCommandProperties } from './utils/properties'

// TODO: move some of the functions in here to utils

type RawCommand = { from: Node; to: Node }

type VariablesMap = {
  [key: string]: string
}

/**
 * Resolve the value of an Identifier or Literal
 * @param variables - A map of variables and their values
 * @param idOrLiteral - A node whose type is Identifier or Literal
 * @returns The value associated with an Identifier or Literal
 * @throws {ReferenceError} if no value is defined for the Identifier
 */
const resolveValue = R.curry((variables: VariablesMap, node: Node): string => {
  if (node.type === 'Literal') {
    return node.value
  } else {
    const value = variables[node.name]

    if (value == null) {
      // TODO: maybe don't use ReferenceErrors
      throw new ReferenceError(`${node.name} is not defined`)
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
const resolveCommandValues = R.curry(
  (variables: VariablesMap, command: RawCommand) =>
    (R.evolve({
      from: resolveValue(variables),
      to: resolveValue(variables)
    } as any)(command) as any) as Subset<Command, 'from' | 'to'>
)

const connectionOf = (from: Node, to: Node): RawCommand => ({ from, to })
const getConnections = getCombinationsWith(connectionOf) as R.CurriedFunction2<
  Node[],
  Node[],
  RawCommand[]
>

/**
 * Expand an EdgeChain object into its commands
 * @param edgeChain - An EdgeChain object
 * @returns A list of commands defined by the EdgeChain
 */
const expandEdgeChain = R.pipe(
  R.prop('nodeLists'),
  combineAdjacentWith((left: NodeList, right: NodeList) =>
    getConnections(left.nodes, right.nodes)
  ),
  R.unnest as any
) as (edgeChain: EdgeChain) => RawCommand[]

// VAC has a limit on the number of characters in a device name
const capDeviceName = (deviceName: string) => deviceName.slice(0, 31).trim()
const capCommandDeviceNames = R.evolve({
  from: capDeviceName,
  to: capDeviceName
})

const getHash = (str: string) => (crc32.str(str) >>> 0).toString(16)

const addCommandHash = morph({
  hash: ({ from, to }) => getHash(from + to)
}) as (
  cmd: Subset<Command, 'from' | 'to'>
) => Subset<Command, 'from' | 'to' | 'hash'>

/**
 * Retrieve a list of connections to make from a vac-dsl program
 * @param program - The AST of a vac-dsl program
 * @returns A list of connections to make
 */
export default (program: AST): Command[] => {
  const { commands } = program.body.reduce(
    (acc, element, index) => {
      switch (element.type) {
        case 'VariableDeclaration':
          acc.variables[element.id.name] = element.value.value
          break
        case 'EdgeChain':
          const properties = element.properties
            ? element.properties.properties
            : null

          if (properties != null) {
            validateProperties(properties)
          }

          const commands = expandEdgeChain(element).map(
            R.pipe(
              resolveCommandValues(acc.variables),
              assocCommandProperties(properties)
            )
          ) as Subset<Command, 'from' | 'to' | 'properties'>[]

          acc.commands = acc.commands.concat(commands)
          break
        case 'Comment':
          break
        default:
          // TODO: better errors
          throw new Error(
            `Unknown AST element type ${(element as any).type} at index ${
              index
            }`
          )
      }

      return acc
    },
    {
      variables: {},
      commands: []
    } as {
      commands: Subset<Command, 'from' | 'to' | 'properties'>[]
      variables: VariablesMap
    }
  )

  // TODO: prevent circular connections

  return commands.map(
    R.pipe(capCommandDeviceNames as any, addCommandHash)
  ) as Command[]
}
