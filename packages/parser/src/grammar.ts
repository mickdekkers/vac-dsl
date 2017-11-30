// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
function id(d: any[]): any {
  return d[0]
}

const pkg = require('read-pkg-up').sync().pkg

const getLoc = (start, length) => ({
  start: { index: start },
  end: { index: start + length },
  length
})
// get node length
const len = d => (d && d.loc && d.loc.length ? d.loc.length : 0)
// get "primitive" (non-ast node) length
const plen = d => (d && d.length ? d.length : 0)

const log = d => (console.log(d), d)

const parser = `${pkg.name}@${pkg.version}`
export interface Token { value: any; [key: string]: any }
export interface Lexer {
  reset: (chunk: string, info: any) => void;
  next: () => Token | undefined;
  save: () => any;
  formatError: (token: Token) => string;
  has: (tokenType: string) => boolean;
}
export interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
}
export type NearleySymbol =
  | string
  | { literal: any }
  | { test: (token: any) => boolean }
export var Lexer: Lexer | undefined = undefined
export var ParserRules: NearleyRule[] = [
  { name: 'Main$ebnf$1', symbols: [] },
  {
    name: 'Main$ebnf$1$subexpression$1',
    symbols: ['__', 'Statement'],
    postprocess: d => ({
      value: d[1],
      length: plen(d[0]) + len(d[1])
    })
  },
  {
    name: 'Main$ebnf$1',
    symbols: ['Main$ebnf$1', 'Main$ebnf$1$subexpression$1'],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'Main',
    symbols: ['_', 'Statement', 'Main$ebnf$1', '_'],
    postprocess: (d, idx) => ({
      type: 'Program',
      body: [d[1]].concat(d[2].map(x => x.value)),
      meta: { parser },
      loc: getLoc(
        idx,
        plen(d[0]) +
          len(d[1]) +
          d[2].reduce((sum, x) => sum + x.length, 0) +
          plen(d[3])
      )
    })
  },
  { name: 'Statement$subexpression$1', symbols: ['VariableDeclaration'] },
  { name: 'Statement$subexpression$1', symbols: ['EdgeChain'] },
  { name: 'Statement$subexpression$1', symbols: ['Comment'] },
  {
    name: 'Statement',
    symbols: ['Statement$subexpression$1'],
    postprocess: d => d[0][0]
  },
  { name: 'Comment$ebnf$1', symbols: [] },
  {
    name: 'Comment$ebnf$1',
    symbols: ['Comment$ebnf$1', /[^\n]/],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'Comment',
    symbols: [{ literal: '#' }, 'Comment$ebnf$1'],
    postprocess: (d, idx) => ({
      type: 'Comment',
      value: d[1].join('').trim(),
      raw: d[0].concat(d[1].join('')),
      loc: getLoc(idx, 1 + d[1].length)
    })
  },
  {
    name: 'EdgeChain$ebnf$1$subexpression$1$string$1',
    symbols: [{ literal: '-' }, { literal: '>' }],
    postprocess: d => d.join('')
  },
  {
    name: 'EdgeChain$ebnf$1$subexpression$1',
    symbols: [
      'sl_',
      'EdgeChain$ebnf$1$subexpression$1$string$1',
      'sl_',
      'NodeList'
    ],
    postprocess: d => ({
      value: d[3],
      length: plen(d[0]) + 2 + plen(d[2]) + len(d[3])
    })
  },
  { name: 'EdgeChain$ebnf$1', symbols: ['EdgeChain$ebnf$1$subexpression$1'] },
  {
    name: 'EdgeChain$ebnf$1$subexpression$2$string$1',
    symbols: [{ literal: '-' }, { literal: '>' }],
    postprocess: d => d.join('')
  },
  {
    name: 'EdgeChain$ebnf$1$subexpression$2',
    symbols: [
      'sl_',
      'EdgeChain$ebnf$1$subexpression$2$string$1',
      'sl_',
      'NodeList'
    ],
    postprocess: d => ({
      value: d[3],
      length: plen(d[0]) + 2 + plen(d[2]) + len(d[3])
    })
  },
  {
    name: 'EdgeChain$ebnf$1',
    symbols: ['EdgeChain$ebnf$1', 'EdgeChain$ebnf$1$subexpression$2'],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'EdgeChain$ebnf$2$subexpression$1',
    symbols: ['sl_', 'PropertyList'],
    postprocess: d => ({
      value: d[1],
      length: plen(d[0]) + len(d[1])
    })
  },
  {
    name: 'EdgeChain$ebnf$2',
    symbols: ['EdgeChain$ebnf$2$subexpression$1'],
    postprocess: id
  },
  { name: 'EdgeChain$ebnf$2', symbols: [], postprocess: () => null },
  {
    name: 'EdgeChain',
    symbols: ['NodeList', 'EdgeChain$ebnf$1', 'EdgeChain$ebnf$2'],
    postprocess: (d, idx) => ({
      type: 'EdgeChain',
      nodeLists: [d[0]].concat(d[1].map(x => x.value)),
      properties: d[2] ? d[2].value : null,
      loc: getLoc(
        idx,
        len(d[0]) +
          d[1].reduce((sum, x) => sum + x.length, 0) +
          (d[2] ? d[2].length : 0)
      )
    })
  },
  { name: 'PropertyList$ebnf$1', symbols: [] },
  {
    name: 'PropertyList$ebnf$1$subexpression$1',
    symbols: ['delimiter', 'Property'],
    postprocess: d => ({
      value: d[1],
      length: plen(d[0]) + len(d[1])
    })
  },
  {
    name: 'PropertyList$ebnf$1',
    symbols: ['PropertyList$ebnf$1', 'PropertyList$ebnf$1$subexpression$1'],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'PropertyList',
    symbols: [
      { literal: '[' },
      'sl_',
      'Property',
      'PropertyList$ebnf$1',
      'sl_',
      { literal: ']' }
    ],
    postprocess: (d, idx) => ({
      type: 'PropertyList',
      properties: [d[2]].concat(d[3].map(x => x.value)),
      loc: getLoc(
        idx,
        1 +
          plen(d[1]) +
          len(d[2]) +
          d[3].reduce((sum, x) => sum + x.length, 0) +
          plen(d[4]) +
          1
      )
    })
  },
  { name: 'Property$ebnf$1', symbols: [/[a-zA-Z0-9_]/] },
  {
    name: 'Property$ebnf$1',
    symbols: ['Property$ebnf$1', /[a-zA-Z0-9_]/],
    postprocess: d => d[0].concat([d[1]])
  },
  { name: 'Property$subexpression$1', symbols: ['jsonfloat'] },
  { name: 'Property$subexpression$1', symbols: ['dqstring'] },
  {
    name: 'Property',
    symbols: [
      'Property$ebnf$1',
      'sl_',
      { literal: '=' },
      'sl_',
      'Property$subexpression$1'
    ],
    postprocess: (d, idx) => ({
      type: 'Property',
      name: d[0].join(''),
      value: d[4][0].value,
      loc: getLoc(
        idx,
        d[0].length + plen(d[1]) + 1 + plen(d[3]) + plen(d[4][0])
      )
    })
  },
  { name: 'NodeList$ebnf$1', symbols: [] },
  {
    name: 'NodeList$ebnf$1$subexpression$1',
    symbols: ['delimiter', 'Node'],
    postprocess: d => ({
      value: d[1],
      length: plen(d[0]) + len(d[1])
    })
  },
  {
    name: 'NodeList$ebnf$1',
    symbols: ['NodeList$ebnf$1', 'NodeList$ebnf$1$subexpression$1'],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'NodeList',
    symbols: ['Node', 'NodeList$ebnf$1'],
    postprocess: (d, idx) => ({
      type: 'NodeList',
      nodes: [d[0]].concat(d[1].map(x => x.value)),
      loc: getLoc(idx, len(d[0]) + d[1].reduce((sum, x) => sum + x.length, 0))
    })
  },
  { name: 'Node$subexpression$1', symbols: ['Identifier'] },
  { name: 'Node$subexpression$1', symbols: ['Literal'] },
  {
    name: 'Node',
    symbols: ['Node$subexpression$1'],
    postprocess: d => d[0][0]
  },
  {
    name: 'VariableDeclaration',
    symbols: ['Identifier', 'sl_', { literal: '=' }, 'sl_', 'Literal'],
    postprocess: (d, idx) => ({
      type: 'VariableDeclaration',
      id: d[0],
      value: d[4],
      loc: getLoc(idx, len(d[0]) + plen(d[1]) + 1 + plen(d[3]) + len(d[4]))
    })
  },
  {
    name: 'Literal',
    symbols: ['dqstring'],
    postprocess: (d, idx) => ({
      type: 'Literal',
      value: d[0].value,
      loc: getLoc(idx, d[0].length)
    })
  },
  { name: 'Identifier$ebnf$1', symbols: [/[a-zA-Z0-9_]/] },
  {
    name: 'Identifier$ebnf$1',
    symbols: ['Identifier$ebnf$1', /[a-zA-Z0-9_]/],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'Identifier',
    symbols: ['Identifier$ebnf$1'],
    postprocess: (d, idx) => ({
      type: 'Identifier',
      name: d[0].join(''),
      loc: getLoc(idx, d[0].length)
    })
  },
  { name: 'delimiter$subexpression$1', symbols: ['sl__'], postprocess: id },
  {
    name: 'delimiter$subexpression$1',
    symbols: ['sl_', { literal: ',' }, 'sl_'],
    postprocess: (d, idx) => ({
      length: plen(d[0]) + 1 + plen(d[2])
    })
  },
  {
    name: 'delimiter',
    symbols: ['delimiter$subexpression$1'],
    postprocess: id
  },
  { name: 'jsonfloat$ebnf$1', symbols: [{ literal: '-' }], postprocess: id },
  { name: 'jsonfloat$ebnf$1', symbols: [], postprocess: () => null },
  { name: 'jsonfloat$ebnf$2', symbols: [/[0-9]/] },
  {
    name: 'jsonfloat$ebnf$2',
    symbols: ['jsonfloat$ebnf$2', /[0-9]/],
    postprocess: d => d[0].concat([d[1]])
  },
  { name: 'jsonfloat$ebnf$3$subexpression$1$ebnf$1', symbols: [/[0-9]/] },
  {
    name: 'jsonfloat$ebnf$3$subexpression$1$ebnf$1',
    symbols: ['jsonfloat$ebnf$3$subexpression$1$ebnf$1', /[0-9]/],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'jsonfloat$ebnf$3$subexpression$1',
    symbols: [{ literal: '.' }, 'jsonfloat$ebnf$3$subexpression$1$ebnf$1']
  },
  {
    name: 'jsonfloat$ebnf$3',
    symbols: ['jsonfloat$ebnf$3$subexpression$1'],
    postprocess: id
  },
  { name: 'jsonfloat$ebnf$3', symbols: [], postprocess: () => null },
  {
    name: 'jsonfloat$ebnf$4$subexpression$1$ebnf$1',
    symbols: [/[+-]/],
    postprocess: id
  },
  {
    name: 'jsonfloat$ebnf$4$subexpression$1$ebnf$1',
    symbols: [],
    postprocess: () => null
  },
  { name: 'jsonfloat$ebnf$4$subexpression$1$ebnf$2', symbols: [/[0-9]/] },
  {
    name: 'jsonfloat$ebnf$4$subexpression$1$ebnf$2',
    symbols: ['jsonfloat$ebnf$4$subexpression$1$ebnf$2', /[0-9]/],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'jsonfloat$ebnf$4$subexpression$1',
    symbols: [
      /[eE]/,
      'jsonfloat$ebnf$4$subexpression$1$ebnf$1',
      'jsonfloat$ebnf$4$subexpression$1$ebnf$2'
    ]
  },
  {
    name: 'jsonfloat$ebnf$4',
    symbols: ['jsonfloat$ebnf$4$subexpression$1'],
    postprocess: id
  },
  { name: 'jsonfloat$ebnf$4', symbols: [], postprocess: () => null },
  {
    name: 'jsonfloat',
    symbols: [
      'jsonfloat$ebnf$1',
      'jsonfloat$ebnf$2',
      'jsonfloat$ebnf$3',
      'jsonfloat$ebnf$4'
    ],
    postprocess: d => {
      const value =
        (d[0] || '') +
        d[1].join('') +
        (d[2] ? '.' + d[2][1].join('') : '') +
        (d[3] ? 'e' + (d[3][1] || '') + d[3][2].join('') : '')

      return {
        value: parseFloat(value),
        length: value.length
      }
    }
  },
  { name: 'dqstring$ebnf$1', symbols: [] },
  {
    name: 'dqstring$ebnf$1',
    symbols: ['dqstring$ebnf$1', 'dstrchar'],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'dqstring',
    symbols: [{ literal: '"' }, 'dqstring$ebnf$1', { literal: '"' }],
    postprocess: d => {
      const { value, length } = d[1].reduce(
        (acc, char) => {
          acc.value += char.value
          acc.length += char.length
          return acc
        },
        { value: '', length: 0 }
      )

      return {
        value,
        length: 1 + length + 1
      }
    }
  },
  {
    name: 'dstrchar',
    symbols: [/[^\\"\n]/],
    postprocess: d => ({ value: d[0], length: 1 })
  },
  {
    name: 'dstrchar',
    symbols: [{ literal: '\\' }, 'strescape'],
    postprocess: d => ({
      value: JSON.parse('"' + d.join('') + '"'),
      length: 1 + d[1].length
    })
  },
  { name: 'strescape', symbols: [/["\\\/bfnrt]/], postprocess: id },
  {
    name: 'strescape',
    symbols: [
      { literal: 'u' },
      /[a-fA-F0-9]/,
      /[a-fA-F0-9]/,
      /[a-fA-F0-9]/,
      /[a-fA-F0-9]/
    ],
    postprocess: function(d) {
      return d.join('')
    }
  },
  { name: 'sl_$ebnf$1', symbols: [] },
  {
    name: 'sl_$ebnf$1',
    symbols: ['sl_$ebnf$1', 'slwschar'],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'sl_',
    symbols: ['sl_$ebnf$1'],
    postprocess: d => ({ length: d[0].length })
  },
  { name: 'sl__$ebnf$1', symbols: ['slwschar'] },
  {
    name: 'sl__$ebnf$1',
    symbols: ['sl__$ebnf$1', 'slwschar'],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'sl__',
    symbols: ['sl__$ebnf$1'],
    postprocess: d => ({ length: d[0].length })
  },
  { name: 'slwschar', symbols: [/[ \t\v\f]/], postprocess: id },
  { name: '_$ebnf$1', symbols: [] },
  {
    name: '_$ebnf$1',
    symbols: ['_$ebnf$1', 'wschar'],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: '_',
    symbols: ['_$ebnf$1'],
    postprocess: d => ({ length: d[0].length })
  },
  { name: '__$ebnf$1', symbols: ['wschar'] },
  {
    name: '__$ebnf$1',
    symbols: ['__$ebnf$1', 'wschar'],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: '__',
    symbols: ['__$ebnf$1'],
    postprocess: d => ({ length: d[0].length })
  },
  { name: 'wschar', symbols: [/[ \t\n\v\f]/], postprocess: id }
]
export var ParserStart: string = 'Main'
