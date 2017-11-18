import { AST, Command } from '@vac-dsl/core'

export const program: string = `
a = "A"
a -> "b"
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
      type: 'EdgeChain',
      nodeLists: [
        {
          type: 'NodeList',
          nodes: [
            { type: 'Identifier', name: 'a', loc: { start: { index: 9 } } }
          ],
          loc: { start: { index: 9 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'b', loc: { start: { index: 14 } } }
          ],
          loc: { start: { index: 14 } }
        }
      ],
      properties: null,
      loc: { start: { index: 9 } }
    }
  ],
  meta: {},
  loc: { start: { index: 0 } }
}

export const commands: Command[] = [
  {
    from: 'A',
    to: 'b',
    hash: 'b076ccf',
    properties: {}
  }
]
