import { AST, Command } from '@vac-dsl/core'

export const program: string = `# Comment!
"a" -> "b"
`

export const ast: AST = {
  type: 'Program',
  body: [
    {
      type: 'Comment',
      value: 'Comment!',
      raw: '# Comment!',
      loc: { start: { index: 0 } }
    },
    {
      type: 'EdgeChain',
      nodeLists: [
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'a', loc: { start: { index: 11 } } }
          ],
          loc: { start: { index: 11 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'b', loc: { start: { index: 18 } } }
          ],
          loc: { start: { index: 18 } }
        }
      ],
      properties: null,
      loc: { start: { index: 11 } }
    }
  ],
  meta: {},
  loc: { start: { index: 0 } }
}

export const commands: Command[] = [
  { from: 'a', to: 'b', properties: {}, hash: '9e83486d' }
]
