/**
 * Retrieve the value of an Identifier or Literal
 * @param ids - A map of Identifiers to their values
 * @param idOrLiteral - A node whose type is Identifier or Literal
 */
const resolveValue = (ids, idOrLiteral) => {
  if (idOrLiteral.type === 'Literal') {
    return idOrLiteral.value
  } else {
    const value = ids[idOrLiteral.name]
    
    if (value == null) {
      throw new ReferenceError(`${idOrLiteral.name} is not defined`)
    }

    return value
  }
}

/**
 * Retrieve a list of connections to make from a vac-dsl program
 * @param program - The AST of a vac-dsl program
 */
export default (program) => {
  const { commands } = program.body.reduce((acc, node, index) => {
    switch (node.type) {
      case 'IdentifierDefinition':
        acc.ids[node.id.name] = node.value.value
        break
      case 'Comment':
        break
      case 'Edge':
        try {
          acc.commands.push({
            from: resolveValue(acc.ids, node.from),
            to: resolveValue(acc.ids, node.to)
          })
        } catch (error) {
          // HACK: refactor this, not a good idea
          if (error instanceof ReferenceError) {
            error.message += ` at index ${index}`
          }

          throw error
        }
        break
      default:
        throw new Error(`Unknown AST node type ${node.type} at index ${index}`)
    }

    return acc
  }, { ids: {}, commands: [] })

  return commands
}
