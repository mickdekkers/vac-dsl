import { AST, Command } from '@vac-dsl/core'

export const program: string = `# Connect a to b
"a" -> "b"

# Connect b to c
# and connect c to d
"b" -> "c" -> "d"
`

export const ast: AST = {
  type: 'Program',
  body: [
    {
      type: 'Comment',
      value: 'Connect a to b',
      raw: '# Connect a to b',
      loc: { start: { index: 0 } }
    },
    {
      type: 'EdgeChain',
      nodeLists: [
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'a', loc: { start: { index: 17 } } }
          ],
          loc: { start: { index: 17 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'b', loc: { start: { index: 24 } } }
          ],
          loc: { start: { index: 24 } }
        }
      ],
      properties: null,
      loc: { start: { index: 17 } }
    },
    {
      type: 'Comment',
      value: 'Connect b to c',
      raw: '# Connect b to c',
      loc: { start: { index: 29 } }
    },
    {
      type: 'Comment',
      value: 'and connect c to d',
      raw: '# and connect c to d',
      loc: { start: { index: 46 } }
    },
    {
      type: 'EdgeChain',
      nodeLists: [
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'b', loc: { start: { index: 67 } } }
          ],
          loc: { start: { index: 67 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'c', loc: { start: { index: 74 } } }
          ],
          loc: { start: { index: 74 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'd', loc: { start: { index: 81 } } }
          ],
          loc: { start: { index: 81 } }
        }
      ],
      properties: null,
      loc: { start: { index: 67 } }
    }
  ],
  meta: {},
  loc: { start: { index: 0 } }
}

export const commands: Command[] = [
  { from: 'a', to: 'b', properties: {}, hash: '9e83486d' },
  { from: 'b', to: 'c', properties: {}, hash: 'c2a92b38' },
  { from: 'c', to: 'd', properties: {}, hash: '45d68fda' }
]
