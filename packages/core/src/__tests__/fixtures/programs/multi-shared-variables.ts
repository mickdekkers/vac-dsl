import { AST, Command } from '@vac-dsl/core'

export const program: string = `a = "A"
b = "B"

a -> b
a -> "C"
b -> "D" -> "E"
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
      id: { type: 'Identifier', name: 'b', loc: { start: { index: 8 } } },
      value: { type: 'Literal', value: 'B', loc: { start: { index: 12 } } },
      loc: { start: { index: 8 } }
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
    },
    {
      type: 'EdgeChain',
      nodeLists: [
        {
          type: 'NodeList',
          nodes: [
            { type: 'Identifier', name: 'a', loc: { start: { index: 24 } } }
          ],
          loc: { start: { index: 24 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'C', loc: { start: { index: 29 } } }
          ],
          loc: { start: { index: 29 } }
        }
      ],
      properties: null,
      loc: { start: { index: 24 } }
    },
    {
      type: 'EdgeChain',
      nodeLists: [
        {
          type: 'NodeList',
          nodes: [
            { type: 'Identifier', name: 'b', loc: { start: { index: 33 } } }
          ],
          loc: { start: { index: 33 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'D', loc: { start: { index: 38 } } }
          ],
          loc: { start: { index: 38 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'E', loc: { start: { index: 45 } } }
          ],
          loc: { start: { index: 45 } }
        }
      ],
      properties: null,
      loc: { start: { index: 33 } }
    }
  ],
  meta: {},
  loc: { start: { index: 0 } }
}

export const commands: Command[] = [
  { from: 'A', to: 'B', properties: {}, hash: '30694c07' },
  { from: 'A', to: 'C', properties: {}, hash: '476e7c91' },
  { from: 'B', to: 'D', properties: {}, hash: 'f227baf1' },
  { from: 'D', to: 'E', properties: {}, hash: 'd37a2de1' }
]
