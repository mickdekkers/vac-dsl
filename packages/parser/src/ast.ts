export interface ASTNode {
  type: string
  loc: {
    start: {
      index: number
    }
  }
}

export interface Literal extends ASTNode {
  type: 'Literal'
  value: string
}

export interface Identifier extends ASTNode {
  type: 'Identifier'
  name: string
}

export interface VariableDeclaration extends ASTNode {
  type: 'VariableDeclaration'
  id: Identifier
  value: Literal
}

export type Node = Identifier | Literal

export interface NodeList extends ASTNode {
  type: 'NodeList'
  nodes: Node[]
}

export interface Property extends ASTNode {
  type: 'Property'
  name: string
  value: string | number
}

export interface PropertyList extends ASTNode {
  type: 'PropertyList'
  properties: Property[]
}

export interface EdgeChain extends ASTNode {
  type: 'EdgeChain'
  nodeLists: NodeList[]
  properties: PropertyList | null
}

export interface Comment extends ASTNode {
  type: 'Comment'
  value: string
  raw: string
}

export type Statement = VariableDeclaration | EdgeChain | Comment

export interface AST extends ASTNode {
  type: 'Program'
  meta: {
    parser: string
  }
  body: Statement[]
}
