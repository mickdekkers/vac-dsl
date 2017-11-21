import { AST, Command } from '@vac-dsl/core'

export const program: string = `a = "A"
c = "C"
a -> "b" -> c
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
      type: 'VariableDeclaration',
      id: { type: 'Identifier', name: 'c', loc: { start: { index: 8 } } },
      value: { type: 'Literal', value: 'C', loc: { start: { index: 12 } } },
      loc: { start: { index: 8 } }
    },
    {
      type: 'EdgeChain',
      nodeLists: [
        {
          type: 'NodeList',
          nodes: [
            { type: 'Identifier', name: 'a', loc: { start: { index: 16 } } }
          ],
          loc: { start: { index: 16 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'b', loc: { start: { index: 21 } } }
          ],
          loc: { start: { index: 21 } }
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
      loc: { start: { index: 16 } }
    }
  ],
  meta: {},
  loc: { start: { index: 0 } }
}

export const commands: Command[] = [
  { from: 'A', to: 'b', properties: {}, hash: 'b076ccf' },
  { from: 'b', to: 'C', properties: {}, hash: 'f9c70bf0' }
]
