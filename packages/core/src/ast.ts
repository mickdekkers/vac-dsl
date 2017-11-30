// TODO: allow optional meta field on all ASTNodes
export interface ASTBase {
  type: string
  loc: {
    start: {
      index: number
      line: number
      column: number
    }
    // TODO: update test fixtures with end locations
    end?: {
      index: number
      line: number
      column: number
    }
    length?: number
  }
}

export interface Literal extends ASTBase {
  type: 'Literal'
  value: string
}

export interface Identifier extends ASTBase {
  type: 'Identifier'
  name: string
}

export interface VariableDeclaration extends ASTBase {
  type: 'VariableDeclaration'
  id: Identifier
  value: Literal
}

export type Node = Identifier | Literal

export interface NodeList extends ASTBase {
  type: 'NodeList'
  nodes: Node[]
}

export interface Property extends ASTBase {
  type: 'Property'
  name: string
  value: string | number
}

export interface PropertyList extends ASTBase {
  type: 'PropertyList'
  properties: Property[]
}

export interface EdgeChain extends ASTBase {
  type: 'EdgeChain'
  nodeLists: NodeList[]
  properties: PropertyList | null
}

export interface Comment extends ASTBase {
  type: 'Comment'
  value: string
  raw: string
}

export type Statement = VariableDeclaration | EdgeChain | Comment

export interface Program extends ASTBase {
  type: 'Program'
  meta: {
    [key: string]: any
  }
  body: Statement[]
}

export type AST = Program

export type ASTNode =
  | Comment
  | EdgeChain
  | Identifier
  | Literal
  | Program
  | Property
  | PropertyList
  | VariableDeclaration
