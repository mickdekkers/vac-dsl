import { AST, Command } from '@vac-dsl/core'

export const raw: string = `
a = "A"
b = "B"
a -> b
`

export const ast: AST = {
  type: 'Program',
  body: [
    {
      type: 'VariableDeclaration',
      id: { type: 'Identifier', name: 'a', loc: { start: { index: 1 } } },
      value: { type: 'Literal', value: 'A', loc: { start: { index: 5 } } },
      loc: { start: { index: 1 } }
    },
    {
      type: 'VariableDeclaration',
      id: { type: 'Identifier', name: 'b', loc: { start: { index: 9 } } },
      value: { type: 'Literal', value: 'B', loc: { start: { index: 13 } } },
      loc: { start: { index: 9 } }
    },
    {
      type: 'EdgeChain',
      nodeLists: [
        {
          type: 'NodeList',
          nodes: [
            { type: 'Identifier', name: 'a', loc: { start: { index: 17 } } }
          ],
          loc: { start: { index: 17 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Identifier', name: 'b', loc: { start: { index: 22 } } }
          ],
          loc: { start: { index: 22 } }
        }
      ],
      properties: null,
      loc: { start: { index: 17 } }
    }
  ],
  meta: { },
  loc: { start: { index: 0 } }
}

export const commands: Command[] = [
  {
    from: 'A',
    to: 'B',
    hash: '30694c07',
    properties: {}
  }
]
