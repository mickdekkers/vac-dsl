import { AST, Command } from '@vac-dsl/core'

export const program: string = `a = "A"
b = "B"
c = "C"

a -> b [sampling_rate=96000]
b -> c [buffers=16]
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
      type: 'EdgeChain',
      nodeLists: [
        {
          type: 'NodeList',
          nodes: [
            { type: 'Identifier', name: 'a', loc: { start: { index: 25 } } }
          ],
          loc: { start: { index: 25 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Identifier', name: 'b', loc: { start: { index: 30 } } }
          ],
          loc: { start: { index: 30 } }
        }
      ],
      properties: {
        type: 'PropertyList',
        properties: [
          {
            type: 'Property',
            name: 'sampling_rate',
            value: 96000,
            loc: { start: { index: 33 } }
          }
        ],
        loc: { start: { index: 32 } }
      },
      loc: { start: { index: 25 } }
    },
    {
      type: 'EdgeChain',
      nodeLists: [
        {
          type: 'NodeList',
          nodes: [
            { type: 'Identifier', name: 'b', loc: { start: { index: 54 } } }
          ],
          loc: { start: { index: 54 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Identifier', name: 'c', loc: { start: { index: 59 } } }
          ],
          loc: { start: { index: 59 } }
        }
      ],
      properties: {
        type: 'PropertyList',
        properties: [
          {
            type: 'Property',
            name: 'buffers',
            value: 16,
            loc: { start: { index: 62 } }
          }
        ],
        loc: { start: { index: 61 } }
      },
      loc: { start: { index: 54 } }
    }
  ],
  meta: {},
  loc: { start: { index: 0 } }
}

export const commands: Command[] = [
  { from: 'A', to: 'B', properties: { SamplingRate: 96000 }, hash: '30694c07' },
  { from: 'B', to: 'C', properties: { Buffers: 16 }, hash: '6c432f52' }
]
