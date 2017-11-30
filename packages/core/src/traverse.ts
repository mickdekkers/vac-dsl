import { orderedProps, aliases } from './ordered-ast-props'
import { ASTNode } from './ast'

export type VisitorFunction = (node: ASTNode, parent: ASTNode | null) => void

export type NodeVisitor =
  | VisitorFunction
  | {
      enter?: VisitorFunction
      leave?: VisitorFunction
    }

export interface Visitor {
  [key: string]: NodeVisitor
}

const getNodeVisitors = (nodeType: string, visitor: Visitor): NodeVisitor[] => {
  let nodeVisitors: NodeVisitor[] = []

  if (visitor[nodeType]) {
    nodeVisitors.push(visitor[nodeType])
  }

  // Check Visitor for aliases of the nodeType
  const nodeAliases = aliases.get(nodeType) || []

  // console.log(typeof nodeAliases.forEach, nodeAliases)
  nodeAliases.forEach(alias => {
    if (visitor[alias]) {
      nodeVisitors.push(visitor[alias])
    }
  })

  // Check Visitor for catch-all
  if (visitor['*']) {
    nodeVisitors.push(visitor['*'])
  }

  return nodeVisitors
}

export const traverse = (root: ASTNode, visitor: Visitor) => {
  // TODO: validate Visitor

  const visit = (node: ASTNode, parent) => {
    // Base case
    if (!node || typeof node.type !== 'string') {
      return
    }

    // Get visitors that are interested in current node type
    const nodeVisitors = getNodeVisitors(node.type, visitor)

    // Trigger enter visitors
    nodeVisitors.forEach(nodeVisitor => {
      if (typeof nodeVisitor === 'function') {
        nodeVisitor(node, parent)
      } else if (typeof nodeVisitor.enter === 'function') {
        nodeVisitor.enter(node, parent)
      }
    })

    // Get list of sub-nodes to recurse into
    const nodeProps = orderedProps.get(node.type)
    if (nodeProps === undefined) {
      throw new Error(`Unknown node type "${node.type}"`)
    }

    // Recurse
    nodeProps.forEach(nodeProp => {
      const child: ASTNode[] | ASTNode = node[nodeProp]
      if (Array.isArray(child)) {
        child.forEach(entry => visit(entry, node))
      } else {
        visit(child, node)
      }
    })

    // Trigger leave visitors
    nodeVisitors.forEach(nodeVisitor => {
      if (
        typeof nodeVisitor !== 'function' &&
        typeof nodeVisitor.leave === 'function'
      ) {
        nodeVisitor.leave(node, parent)
      }
    })
  }

  visit(root, null)
}
