import { AST, Command } from '@vac-dsl/core'

export const program: string = `"a" -> "b" -> "c" -> "d" -> "e" -> "f" -> "g" -> "h" -> "i" -> "j" -> "k" -> "l"
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
            { type: 'Literal', value: 'a', loc: { start: { index: 0 } } }
          ],
          loc: { start: { index: 0 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'b', loc: { start: { index: 7 } } }
          ],
          loc: { start: { index: 7 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'c', loc: { start: { index: 14 } } }
          ],
          loc: { start: { index: 14 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'd', loc: { start: { index: 21 } } }
          ],
          loc: { start: { index: 21 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'e', loc: { start: { index: 28 } } }
          ],
          loc: { start: { index: 28 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'f', loc: { start: { index: 35 } } }
          ],
          loc: { start: { index: 35 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'g', loc: { start: { index: 42 } } }
          ],
          loc: { start: { index: 42 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'h', loc: { start: { index: 49 } } }
          ],
          loc: { start: { index: 49 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'i', loc: { start: { index: 56 } } }
          ],
          loc: { start: { index: 56 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'j', loc: { start: { index: 63 } } }
          ],
          loc: { start: { index: 63 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'k', loc: { start: { index: 70 } } }
          ],
          loc: { start: { index: 70 } }
        },
        {
          type: 'NodeList',
          nodes: [
            { type: 'Literal', value: 'l', loc: { start: { index: 77 } } }
          ],
          loc: { start: { index: 77 } }
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
  { from: 'a', to: 'b', properties: {}, hash: '9e83486d' },
  { from: 'b', to: 'c', properties: {}, hash: 'c2a92b38' },
  { from: 'c', to: 'd', properties: {}, hash: '45d68fda' },
  { from: 'd', to: 'e', properties: {}, hash: '7d90298b' },
  { from: 'e', to: 'f', properties: {}, hash: 'fd824970' },
  { from: 'f', to: 'g', properties: {}, hash: 'a1a82a25' },
  { from: 'g', to: 'h', properties: {}, hash: '280c06f5' },
  { from: 'h', to: 'i', properties: {}, hash: 'd8932aac' },
  { from: 'i', to: 'j', properties: {}, hash: '58814a57' },
  { from: 'j', to: 'k', properties: {}, hash: '4ab2902' },
  { from: 'k', to: 'l', properties: {}, hash: '83d48de0' }
]
