import R from 'ramda'

/**
 * Retrieve the value of an Identifier or Literal
 * @param ids - A map of Identifiers to their values
 * @param idOrLiteral - A node whose type is Identifier or Literal
 */
const resolveValue = R.curry((ids, idOrLiteral) => {
  if (idOrLiteral.type === 'Literal') {
    return idOrLiteral.value
  } else {
    const value = ids[idOrLiteral.name]

    if (value == null) {
      // FIXME: maybe don't use ReferenceErrors
      throw new ReferenceError(`${idOrLiteral.name} is not defined`)
    }

    return value
  }
})

// TODO: rename these functions
const resolveConnections = (left, right) => {
  const connections = []

  // TODO: find more fp inspired method of doing this
  left.forEach(l => right.forEach(r => connections.push({ from: l, to: r })))

  return connections
}

const flattenEdges = edges => {
  // TODO: find more fp inspired method of doing this too
  return edges.reduce((acc, el, index) => {
    const left = el
    const right = edges[index + 1]

    if (right != null) {
      acc = acc.concat(resolveConnections(left.nodes, right.nodes))
    }

    return acc
  }, [])
}

/**
 * Retrieve a list of connections to make from a vac-dsl program
 * @param program - The AST of a vac-dsl program
 */
export default program => {
  const { commands } = program.body.reduce(
    (acc, element, index) => {
      switch (element.type) {
        case 'IdentifierDefinition':
          acc.ids[element.id.name] = element.value.value
          break
        case 'Comment':
          break
        case 'Edge':
          // TODO: refactor this
          acc.commands = acc.commands.concat(
            flattenEdges(element.nodes).map(
              R.evolve({
                from: resolveValue(acc.ids),
                to: resolveValue(acc.ids)
              })
            )
          )
          break
        default:
          // TODO: better errors
          throw new Error(
            `Unknown AST element type ${element.type} at index ${index}`
          )
      }

      return acc
    },
    { ids: {}, commands: [] }
  )

  return commands
}
