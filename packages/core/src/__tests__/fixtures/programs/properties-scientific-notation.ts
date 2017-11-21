import { AST, Command } from '@vac-dsl/core'

export const program: string = `a = "A"
a -> "b" [sampling_rate=9.6e4 buffer_ms=100]
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
            { type: 'Identifier', name: 'a', loc: { start: { index: 8 } } }
          ],
          loc: { start: { index: 8 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'b', loc: { start: { index: 13 } } }
          ],
          loc: { start: { index: 13 } }
        }
      ],
      properties: {
        type: 'PropertyList',
        properties: [
          {
            type: 'Property',
            name: 'sampling_rate',
            value: 96000,
            loc: { start: { index: 18 } }
          },
          {
            type: 'Property',
            name: 'buffer_ms',
            value: 100,
            loc: { start: { index: 38 } }
          }
        ],
        loc: { start: { index: 17 } }
      },
      loc: { start: { index: 8 } }
    }
  ],
  meta: {},
  loc: { start: { index: 0 } }
}

export const commands: Command[] = [
  {
    from: 'A',
    to: 'b',
    properties: { SamplingRate: 96000, BufferMs: 100 },
    hash: 'b076ccf'
  }
]
