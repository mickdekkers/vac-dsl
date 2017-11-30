import { AST } from './ast'
import { traverse } from './traverse'
import { ast as basicAst } from './__tests__/fixtures/programs/basic-literals'
import { ast as threeTwoThreeAst } from './__tests__/fixtures/programs/3-to-2-to-3-variables'
import { ast as propertiesMultiAst } from './__tests__/fixtures/programs/properties-multi'
import * as _ from 'lodash'

describe('traverse', () => {
  it('visits all nodes of type specified in visitor', () => {
    {
      const visitedNodes: string[] = []
      traverse(basicAst, {
        Identifier: node => visitedNodes.push(node.type)
      })

      expect(visitedNodes.length).toBe(0)
    }

    {
      const visitedNodes: string[] = []
      traverse(threeTwoThreeAst, {
        Identifier: node => visitedNodes.push(node.type)
      })

      expect(visitedNodes.every(node => node === 'Identifier')).toBe(true)
      expect(visitedNodes.length).toBe(16)
    }

    {
      const visitedNodes: string[] = []
      traverse(propertiesMultiAst, {
        Identifier: node => visitedNodes.push(node.type)
      })

      expect(visitedNodes.every(node => node === 'Identifier')).toBe(true)
      expect(visitedNodes.length).toBe(7)
    }
  })

  it('accepts aliases', () => {
    {
      const visitedNodes: string[] = []
      traverse(basicAst, {
        Statement: node => visitedNodes.push(node.type)
      })

      expect(visitedNodes).toMatchSnapshot()
    }

    {
      const visitedNodes: string[] = []
      traverse(threeTwoThreeAst, {
        Statement: node => visitedNodes.push(node.type)
      })

      expect(visitedNodes).toMatchSnapshot()
    }

    {
      const visitedNodes: string[] = []
      traverse(propertiesMultiAst, {
        Statement: node => visitedNodes.push(node.type)
      })

      expect(visitedNodes).toMatchSnapshot()
    }
  })

  it('visits all nodes in order when using * catch-all', () => {
    {
      let visitedLog = ''
      let indent = 0
      traverse(basicAst, {
        '*': {
          enter: (node, parent) => {
            visitedLog += ' '.repeat(indent) + node.type + '\n'
            indent += 2
          },
          leave: () => {
            indent -= 2
          }
        }
      })

      expect(visitedLog).toMatchSnapshot()
    }

    {
      let visitedLog = ''
      let indent = 0
      traverse(threeTwoThreeAst, {
        '*': {
          enter: (node, parent) => {
            visitedLog += ' '.repeat(indent) + node.type + '\n'
            indent += 2
          },
          leave: () => {
            indent -= 2
          }
        }
      })

      expect(visitedLog).toMatchSnapshot()
    }

    {
      let visitedLog = ''
      let indent = 0
      traverse(propertiesMultiAst, {
        '*': {
          enter: (node, parent) => {
            visitedLog += ' '.repeat(indent) + node.type + '\n'
            indent += 2
          },
          leave: () => {
            indent -= 2
          }
        }
      })

      expect(visitedLog).toMatchSnapshot()
    }
  })

  it('invokes all matching visitors for each node type', () => {
    {
      const visitedNodes: string[] = []
      traverse(basicAst, {
        EdgeChain: node => visitedNodes.push(node.type),
        Statement: node => visitedNodes.push(node.type),
        '*': node => visitedNodes.push(node.type)
      })

      expect(visitedNodes).toMatchSnapshot()
    }

    {
      const visitedNodes: string[] = []
      traverse(threeTwoThreeAst, {
        EdgeChain: node => visitedNodes.push(node.type),
        Statement: node => visitedNodes.push(node.type),
        '*': node => visitedNodes.push(node.type)
      })

      expect(visitedNodes).toMatchSnapshot()
    }

    {
      const visitedNodes: string[] = []
      traverse(propertiesMultiAst, {
        EdgeChain: node => visitedNodes.push(node.type),
        Statement: node => visitedNodes.push(node.type),
        '*': node => visitedNodes.push(node.type)
      })

      expect(visitedNodes).toMatchSnapshot()
    }
  })

  it('allows mutation of nodes', () => {
    const ast = _.cloneDeep(basicAst)
    traverse(ast, {
      Program: node => {
        ;(node as AST).meta['hello'] = 'Hello, world!'
      }
    })

    expect(ast.meta['hello']).toBe('Hello, world!')
  })

  it('throws if it encounters an unknown node type', () => {
    expect(() => {
      traverse({ type: 'foo' } as any, {
        '*': () => {}
      })
    }).toThrow(/unknown/i)
  })
})
