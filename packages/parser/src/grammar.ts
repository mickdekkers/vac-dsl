// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
function id(d: any[]): any {
  return d[0]
}

const { reject } = require('lodash')
const pkg = require('read-pkg-up').sync().pkg

// This is apparently not as "built-in" as the docs suggest
const nuller = d => null

const log = d => (console.log(d), d)
const flatten = arrays => Array.prototype.concat.apply([], arrays)
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
  { name: '_$ebnf$1', symbols: [] },
  {
    name: '_$ebnf$1',
    symbols: ['_$ebnf$1', 'wschar'],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: '_',
    symbols: ['_$ebnf$1'],
    postprocess: function(d) {
      return null
    }
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
    postprocess: function(d) {
      return null
    }
  },
  { name: 'wschar', symbols: [/[ \t\n\v\f]/], postprocess: id },
  { name: 'dqstring$ebnf$1', symbols: [] },
  {
    name: 'dqstring$ebnf$1',
    symbols: ['dqstring$ebnf$1', 'dstrchar'],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'dqstring',
    symbols: [{ literal: '"' }, 'dqstring$ebnf$1', { literal: '"' }],
    postprocess: function(d) {
      return d[1].join('')
    }
  },
  { name: 'sqstring$ebnf$1', symbols: [] },
  {
    name: 'sqstring$ebnf$1',
    symbols: ['sqstring$ebnf$1', 'sstrchar'],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'sqstring',
    symbols: [{ literal: "'" }, 'sqstring$ebnf$1', { literal: "'" }],
    postprocess: function(d) {
      return d[1].join('')
    }
  },
  { name: 'btstring$ebnf$1', symbols: [] },
  {
    name: 'btstring$ebnf$1',
    symbols: ['btstring$ebnf$1', /[^`]/],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'btstring',
    symbols: [{ literal: '`' }, 'btstring$ebnf$1', { literal: '`' }],
    postprocess: function(d) {
      return d[1].join('')
    }
  },
  { name: 'dstrchar', symbols: [/[^\\"\n]/], postprocess: id },
  {
    name: 'dstrchar',
    symbols: [{ literal: '\\' }, 'strescape'],
    postprocess: function(d) {
      return JSON.parse('"' + d.join('') + '"')
    }
  },
  { name: 'sstrchar', symbols: [/[^\\'\n]/], postprocess: id },
  {
    name: 'sstrchar',
    symbols: [{ literal: '\\' }, 'strescape'],
    postprocess: function(d) {
      return JSON.parse('"' + d.join('') + '"')
    }
  },
  {
    name: 'sstrchar$string$1',
    symbols: [{ literal: '\\' }, { literal: "'" }],
    postprocess: d => d.join('')
  },
  {
    name: 'sstrchar',
    symbols: ['sstrchar$string$1'],
    postprocess: function(d) {
      return "'"
    }
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
  { name: 'unsigned_int$ebnf$1', symbols: [/[0-9]/] },
  {
    name: 'unsigned_int$ebnf$1',
    symbols: ['unsigned_int$ebnf$1', /[0-9]/],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'unsigned_int',
    symbols: ['unsigned_int$ebnf$1'],
    postprocess: function(d) {
      return parseInt(d[0].join(''))
    }
  },
  { name: 'int$ebnf$1$subexpression$1', symbols: [{ literal: '-' }] },
  { name: 'int$ebnf$1$subexpression$1', symbols: [{ literal: '+' }] },
  {
    name: 'int$ebnf$1',
    symbols: ['int$ebnf$1$subexpression$1'],
    postprocess: id
  },
  { name: 'int$ebnf$1', symbols: [], postprocess: () => null },
  { name: 'int$ebnf$2', symbols: [/[0-9]/] },
  {
    name: 'int$ebnf$2',
    symbols: ['int$ebnf$2', /[0-9]/],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'int',
    symbols: ['int$ebnf$1', 'int$ebnf$2'],
    postprocess: function(d) {
      if (d[0]) {
        return parseInt(d[0][0] + d[1].join(''))
      } else {
        return parseInt(d[1].join(''))
      }
    }
  },
  { name: 'unsigned_decimal$ebnf$1', symbols: [/[0-9]/] },
  {
    name: 'unsigned_decimal$ebnf$1',
    symbols: ['unsigned_decimal$ebnf$1', /[0-9]/],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'unsigned_decimal$ebnf$2$subexpression$1$ebnf$1',
    symbols: [/[0-9]/]
  },
  {
    name: 'unsigned_decimal$ebnf$2$subexpression$1$ebnf$1',
    symbols: ['unsigned_decimal$ebnf$2$subexpression$1$ebnf$1', /[0-9]/],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'unsigned_decimal$ebnf$2$subexpression$1',
    symbols: [
      { literal: '.' },
      'unsigned_decimal$ebnf$2$subexpression$1$ebnf$1'
    ]
  },
  {
    name: 'unsigned_decimal$ebnf$2',
    symbols: ['unsigned_decimal$ebnf$2$subexpression$1'],
    postprocess: id
  },
  { name: 'unsigned_decimal$ebnf$2', symbols: [], postprocess: () => null },
  {
    name: 'unsigned_decimal',
    symbols: ['unsigned_decimal$ebnf$1', 'unsigned_decimal$ebnf$2'],
    postprocess: function(d) {
      return parseFloat(d[0].join('') + (d[1] ? '.' + d[1][1].join('') : ''))
    }
  },
  { name: 'decimal$ebnf$1', symbols: [{ literal: '-' }], postprocess: id },
  { name: 'decimal$ebnf$1', symbols: [], postprocess: () => null },
  { name: 'decimal$ebnf$2', symbols: [/[0-9]/] },
  {
    name: 'decimal$ebnf$2',
    symbols: ['decimal$ebnf$2', /[0-9]/],
    postprocess: d => d[0].concat([d[1]])
  },
  { name: 'decimal$ebnf$3$subexpression$1$ebnf$1', symbols: [/[0-9]/] },
  {
    name: 'decimal$ebnf$3$subexpression$1$ebnf$1',
    symbols: ['decimal$ebnf$3$subexpression$1$ebnf$1', /[0-9]/],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'decimal$ebnf$3$subexpression$1',
    symbols: [{ literal: '.' }, 'decimal$ebnf$3$subexpression$1$ebnf$1']
  },
  {
    name: 'decimal$ebnf$3',
    symbols: ['decimal$ebnf$3$subexpression$1'],
    postprocess: id
  },
  { name: 'decimal$ebnf$3', symbols: [], postprocess: () => null },
  {
    name: 'decimal',
    symbols: ['decimal$ebnf$1', 'decimal$ebnf$2', 'decimal$ebnf$3'],
    postprocess: function(d) {
      return parseFloat(
        (d[0] || '') + d[1].join('') + (d[2] ? '.' + d[2][1].join('') : '')
      )
    }
  },
  {
    name: 'percentage',
    symbols: ['decimal', { literal: '%' }],
    postprocess: function(d) {
      return d[0] / 100
    }
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
    postprocess: function(d) {
      return parseFloat(
        (d[0] || '') +
          d[1].join('') +
          (d[2] ? '.' + d[2][1].join('') : '') +
          (d[3] ? 'e' + (d[3][1] || '+') + d[3][2].join('') : '')
      )
    }
  },
  { name: 'Main$ebnf$1', symbols: [] },
  {
    name: 'Main$ebnf$1$subexpression$1',
    symbols: ['__', 'Statement'],
    postprocess: d => d[1][0]
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
      body: reject(flatten(d), x => x === null), // remove nulls from whitespace
      meta: {
        parser
      },
      loc: {
        start: { index: idx }
      }
    })
  },
  { name: 'Statement', symbols: ['VariableDeclaration'] },
  { name: 'Statement', symbols: ['EdgeChain'] },
  { name: 'Statement', symbols: ['Comment'] },
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
      loc: {
        start: { index: idx }
      }
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
    postprocess: d => d[3]
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
    postprocess: d => d[3]
  },
  {
    name: 'EdgeChain$ebnf$1',
    symbols: ['EdgeChain$ebnf$1', 'EdgeChain$ebnf$1$subexpression$2'],
    postprocess: d => d[0].concat([d[1]])
  },
  {
    name: 'EdgeChain$ebnf$2$subexpression$1',
    symbols: ['sl_', 'PropertyList'],
    postprocess: d => d[1]
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
      nodeLists: [d[0]].concat(d[1]),
      properties: d[2] || null,
      loc: {
        start: { index: idx }
      }
    })
  },
  { name: 'PropertyList$ebnf$1', symbols: [] },
  {
    name: 'PropertyList$ebnf$1$subexpression$1',
    symbols: ['delimiter', 'Property'],
    postprocess: d => d[1]
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
      properties: [d[2]].concat(d[3]),
      loc: {
        start: { index: idx }
      }
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
      value: d[4][0],
      loc: {
        start: { index: idx }
      }
    })
  },
  { name: 'NodeList$ebnf$1', symbols: [] },
  {
    name: 'NodeList$ebnf$1$subexpression$1',
    symbols: ['delimiter', 'Node'],
    postprocess: d => d[1][0]
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
      nodes: flatten(d),
      loc: {
        start: { index: idx }
      }
    })
  },
  { name: 'Node', symbols: ['Identifier'] },
  { name: 'Node', symbols: ['Literal'] },
  {
    name: 'VariableDeclaration',
    symbols: ['Identifier', 'sl_', { literal: '=' }, 'sl_', 'Literal'],
    postprocess: (d, idx) => ({
      type: 'VariableDeclaration',
      id: d[0],
      value: d[4],
      loc: {
        start: { index: idx }
      }
    })
  },
  {
    name: 'Literal',
    symbols: ['dqstring'],
    postprocess: (d, idx) => ({
      type: 'Literal',
      value: d[0],
      loc: {
        start: { index: idx }
      }
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
      loc: {
        start: { index: idx }
      }
    })
  },
  { name: 'delimiter$subexpression$1', symbols: ['sl__'] },
  {
    name: 'delimiter$subexpression$1',
    symbols: ['sl_', { literal: ',' }, 'sl_']
  },
  { name: 'delimiter', symbols: ['delimiter$subexpression$1'] },
  { name: 'sl_$ebnf$1', symbols: [] },
  {
    name: 'sl_$ebnf$1',
    symbols: ['sl_$ebnf$1', 'slwschar'],
    postprocess: d => d[0].concat([d[1]])
  },
  { name: 'sl_', symbols: ['sl_$ebnf$1'], postprocess: nuller },
  { name: 'sl__$ebnf$1', symbols: ['slwschar'] },
  {
    name: 'sl__$ebnf$1',
    symbols: ['sl__$ebnf$1', 'slwschar'],
    postprocess: d => d[0].concat([d[1]])
  },
  { name: 'sl__', symbols: ['sl__$ebnf$1'], postprocess: nuller },
  { name: 'slwschar', symbols: [/[ \t\v\f]/], postprocess: id }
]
export var ParserStart: string = 'Main'
