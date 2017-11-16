import { AST, Command } from '@vac-dsl/core'

export const raw: string = `
"a" -> "b"
`

export const ast: AST = {
  type: 'Program',
  body: [
    {
      type: 'EdgeChain',
      nodeLists: [
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'a', loc: { start: { index: 1 } } }
          ],
          loc: { start: { index: 1 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'b', loc: { start: { index: 8 } } }
          ],
          loc: { start: { index: 8 } }
        }
      ],
      properties: null,
      loc: { start: { index: 1 } }
    }
  ],
  meta: { },
  loc: { start: { index: 0 } }
}

export const commands: Command[] = [
  {
    from: 'a',
    to: 'b',
    hash: '9e83486d',
    properties: {}
  }
]
