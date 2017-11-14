import compiler from './index'
import { AST, Command } from '@vac-dsl/core'

const basicAst: AST = {
  type: 'Program',
  body: [
    {
      type: 'EdgeChain',
      nodeLists: [
        {
          type: 'NodeList',
          nodes: [
            {
              type: 'Literal',
              value: 'a',
              loc: { start: { index: 0 } }
            }
          ],
          loc: { start: { index: 0 } }
        },
        {
          type: 'NodeList',
          nodes: [
            {
              type: 'Literal',
              value: 'b',
              loc: { start: { index: 7 } }
            }
          ],
          loc: { start: { index: 7 } }
        }
      ],
      properties: null,
      loc: { start: { index: 0 } }
    }
  ],
  meta: { parser: 'foo' },
  loc: { start: { index: 0 } }
}

test('performs basic compilation', () => {
  const result: Command[] = compiler(basicAst)
  const expected: Command[] = [
    {
      from: 'a',
      to: 'b',
      hash: '',
      properties: {}
    }
  ]

  expect(result).toEqual(expected)
})
