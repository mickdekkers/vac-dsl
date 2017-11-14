import { AST, Command } from '@vac-dsl/core'

export const raw: string = `"a" -> "b"`

export const ast: AST = {
  type: 'Program',
  body: [
    {
      type: 'EdgeChain',
      nodeLists: [
        {
          type: 'NodeList',
          nodes: [
            {
              type: 'Literal',
              value: 'a',
              loc: { start: { index: 0 } }
            }
          ],
          loc: { start: { index: 0 } }
        },
        {
          type: 'NodeList',
          nodes: [
            {
              type: 'Literal',
              value: 'b',
              loc: { start: { index: 7 } }
            }
          ],
          loc: { start: { index: 7 } }
        }
      ],
      properties: null,
      loc: { start: { index: 0 } }
    }
  ],
  meta: { parser: 'foo' },
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
