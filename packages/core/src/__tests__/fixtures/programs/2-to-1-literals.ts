import { AST, Command } from '@vac-dsl/core'

export const program: string = `"a", "b" -> "c"`

export const ast: AST = {
  type: 'Program',
  body: [
    {
      type: 'EdgeChain',
      nodeLists: [
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'a', loc: { start: { index: 0 } } },
            { type: 'Literal', value: 'b', loc: { start: { index: 5 } } }
          ],
          loc: { start: { index: 0 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'c', loc: { start: { index: 12 } } }
          ],
          loc: { start: { index: 12 } }
        }
      ],
      properties: null,
      loc: { start: { index: 0 } }
    }
  ],
  meta: {},
  loc: { start: { index: 0 } }
}

export const commands: Command[] = [
  { from: 'a', to: 'c', properties: {}, hash: 'e98478fb' },
  { from: 'b', to: 'c', properties: {}, hash: 'c2a92b38' }
]
