import { AST, Command } from '@vac-dsl/core'

export const program: string = `a = "A"
b = "B"
c = "C"
d = "D"
e = "E"
f = "F"
g = "G"
h = "H"

a, b, c -> d, e -> f, g, h
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
      type: 'VariableDeclaration',
      id: { type: 'Identifier', name: 'c', loc: { start: { index: 16 } } },
      value: { type: 'Literal', value: 'C', loc: { start: { index: 20 } } },
      loc: { start: { index: 16 } }
    },
    {
      type: 'VariableDeclaration',
      id: { type: 'Identifier', name: 'd', loc: { start: { index: 24 } } },
      value: { type: 'Literal', value: 'D', loc: { start: { index: 28 } } },
      loc: { start: { index: 24 } }
    },
    {
      type: 'VariableDeclaration',
      id: { type: 'Identifier', name: 'e', loc: { start: { index: 32 } } },
      value: { type: 'Literal', value: 'E', loc: { start: { index: 36 } } },
      loc: { start: { index: 32 } }
    },
    {
      type: 'VariableDeclaration',
      id: { type: 'Identifier', name: 'f', loc: { start: { index: 40 } } },
      value: { type: 'Literal', value: 'F', loc: { start: { index: 44 } } },
      loc: { start: { index: 40 } }
    },
    {
      type: 'VariableDeclaration',
      id: { type: 'Identifier', name: 'g', loc: { start: { index: 48 } } },
      value: { type: 'Literal', value: 'G', loc: { start: { index: 52 } } },
      loc: { start: { index: 48 } }
    },
    {
      type: 'VariableDeclaration',
      id: { type: 'Identifier', name: 'h', loc: { start: { index: 56 } } },
      value: { type: 'Literal', value: 'H', loc: { start: { index: 60 } } },
      loc: { start: { index: 56 } }
    },
    {
      type: 'EdgeChain',
      nodeLists: [
        {
          type: 'NodeList',
          nodes: [
            { type: 'Identifier', name: 'a', loc: { start: { index: 65 } } },
            { type: 'Identifier', name: 'b', loc: { start: { index: 68 } } },
            { type: 'Identifier', name: 'c', loc: { start: { index: 71 } } }
          ],
          loc: { start: { index: 65 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Identifier', name: 'd', loc: { start: { index: 76 } } },
            { type: 'Identifier', name: 'e', loc: { start: { index: 79 } } }
          ],
          loc: { start: { index: 76 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Identifier', name: 'f', loc: { start: { index: 84 } } },
            { type: 'Identifier', name: 'g', loc: { start: { index: 87 } } },
            { type: 'Identifier', name: 'h', loc: { start: { index: 90 } } }
          ],
          loc: { start: { index: 84 } }
        }
      ],
      properties: null,
      loc: { start: { index: 65 } }
    }
  ],
  meta: {},
  loc: { start: { index: 0 } }
}

export const commands: Command[] = [
  { from: 'A', to: 'D', properties: {}, hash: 'd90ae932' },
  { from: 'A', to: 'E', properties: {}, hash: 'ae0dd9a4' },
  { from: 'B', to: 'D', properties: {}, hash: 'f227baf1' },
  { from: 'B', to: 'E', properties: {}, hash: '85208a67' },
  { from: 'C', to: 'D', properties: {}, hash: 'eb3c8bb0' },
  { from: 'C', to: 'E', properties: {}, hash: '9c3bbb26' },
  { from: 'D', to: 'F', properties: {}, hash: '4a737c5b' },
  { from: 'D', to: 'G', properties: {}, hash: '3d744ccd' },
  { from: 'D', to: 'H', properties: {}, hash: 'adcb515c' },
  { from: 'E', to: 'F', properties: {}, hash: '53684d1a' },
  { from: 'E', to: 'G', properties: {}, hash: '246f7d8c' },
  { from: 'E', to: 'H', properties: {}, hash: 'b4d0601d' }
]
