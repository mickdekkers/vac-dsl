import { AST, Command } from '@vac-dsl/core'

export const program: string = `a = "A"
a, "b" -> "c"
`

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
      type: 'EdgeChain',
      nodeLists: [
        {
          type: 'NodeList',
          nodes: [
            { type: 'Identifier', name: 'a', loc: { start: { index: 8 } } },
            { type: 'Literal', value: 'b', loc: { start: { index: 11 } } }
          ],
          loc: { start: { index: 8 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'c', loc: { start: { index: 18 } } }
          ],
          loc: { start: { index: 18 } }
        }
      ],
      properties: null,
      loc: { start: { index: 8 } }
    }
  ],
  meta: {},
  loc: { start: { index: 0 } }
}

export const commands: Command[] = [
  { from: 'A', to: 'c', properties: {}, hash: '7c005c59' },
  { from: 'b', to: 'c', properties: {}, hash: 'c2a92b38' }
]
