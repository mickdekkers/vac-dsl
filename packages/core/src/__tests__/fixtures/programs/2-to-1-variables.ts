import { AST, Command } from '@vac-dsl/core'

export const program: string = `a = "A"
b="B"
c="C"
a, b -> c`

export const ast: AST = {
  type: 'Program',
  body: [
    {
      type: 'VariableDeclaration',
      id: { type: 'Identifier', name: 'a', loc: { start: { index: 0 } } },
      value: { type: 'Literal', value: 'A', loc: { start: { index: 4 } } },
      loc: { start: { index: 0 } }
    },
    {
      type: 'VariableDeclaration',
      id: { type: 'Identifier', name: 'b', loc: { start: { index: 8 } } },
      value: { type: 'Literal', value: 'B', loc: { start: { index: 10 } } },
      loc: { start: { index: 8 } }
    },
    {
      type: 'VariableDeclaration',
      id: { type: 'Identifier', name: 'c', loc: { start: { index: 14 } } },
      value: { type: 'Literal', value: 'C', loc: { start: { index: 16 } } },
      loc: { start: { index: 14 } }
    },
    {
      type: 'EdgeChain',
      nodeLists: [
        {
          type: 'NodeList',
          nodes: [
            { type: 'Identifier', name: 'a', loc: { start: { index: 20 } } },
            { type: 'Identifier', name: 'b', loc: { start: { index: 23 } } }
          ],
          loc: { start: { index: 20 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Identifier', name: 'c', loc: { start: { index: 28 } } }
          ],
          loc: { start: { index: 28 } }
        }
      ],
      properties: null,
      loc: { start: { index: 20 } }
    }
  ],
  meta: {},
  loc: { start: { index: 0 } }
}

export const commands: Command[] = [
  { from: 'A', to: 'C', properties: {}, hash: '476e7c91' },
  { from: 'B', to: 'C', properties: {}, hash: '6c432f52' }
]
