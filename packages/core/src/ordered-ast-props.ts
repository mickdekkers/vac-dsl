const id = <T>(x: T): T => x

// These functions only serve to aid readability
const Literal = id
const Identifier = id
const NodeLists = id
const Properties = id
const PropertyList = id
const Statements = id
const Nodes = id

// AST node props in order of source code position
export const orderedProps = new Map([
  ['Comment', []],
  ['EdgeChain', [NodeLists('nodeLists'), PropertyList('properties')]],
  ['Identifier', []],
  ['Literal', []],
  ['NodeList', [Nodes('nodes')]],
  ['Program', [Statements('body')]],
  ['Property', []],
  ['PropertyList', [Properties('properties')]],
  ['VariableDeclaration', [Identifier('id'), Literal('value')]]
])

// Aliases for Visitors
export const aliases = new Map([
  // Statements
  ['Comment', ['Statement']],
  ['EdgeChain', ['Statement']],
  ['VariableDeclaration', ['Statement']]
])
