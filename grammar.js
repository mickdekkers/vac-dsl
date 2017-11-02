// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
;(function() {
  function id(x) {
    return x[0]
  }

  // This is apparently not as "built-in" as the docs suggest
  const nuller = d => null
  const log = d => (console.log(d), d)
  const flatten = arrays => Array.prototype.concat.apply([], arrays)
  const pkg = require('./package.json')
  const parser = `${pkg.name}@${pkg.version}`
  const { reject } = require('lodash')
  var grammar = {
    Lexer: undefined,
    ParserRules: [
      { name: 'dqstring$ebnf$1', symbols: [] },
      {
        name: 'dqstring$ebnf$1',
        symbols: ['dqstring$ebnf$1', 'dstrchar'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
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
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
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
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
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
        postprocess: function joiner(d) {
          return d.join('')
        }
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
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
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
      {
        name: 'int$ebnf$1',
        symbols: [],
        postprocess: function(d) {
          return null
        }
      },
      { name: 'int$ebnf$2', symbols: [/[0-9]/] },
      {
        name: 'int$ebnf$2',
        symbols: ['int$ebnf$2', /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
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
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      {
        name: 'unsigned_decimal$ebnf$2$subexpression$1$ebnf$1',
        symbols: [/[0-9]/]
      },
      {
        name: 'unsigned_decimal$ebnf$2$subexpression$1$ebnf$1',
        symbols: ['unsigned_decimal$ebnf$2$subexpression$1$ebnf$1', /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
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
      {
        name: 'unsigned_decimal$ebnf$2',
        symbols: [],
        postprocess: function(d) {
          return null
        }
      },
      {
        name: 'unsigned_decimal',
        symbols: ['unsigned_decimal$ebnf$1', 'unsigned_decimal$ebnf$2'],
        postprocess: function(d) {
          return parseFloat(
            d[0].join('') + (d[1] ? '.' + d[1][1].join('') : '')
          )
        }
      },
      { name: 'decimal$ebnf$1', symbols: [{ literal: '-' }], postprocess: id },
      {
        name: 'decimal$ebnf$1',
        symbols: [],
        postprocess: function(d) {
          return null
        }
      },
      { name: 'decimal$ebnf$2', symbols: [/[0-9]/] },
      {
        name: 'decimal$ebnf$2',
        symbols: ['decimal$ebnf$2', /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      { name: 'decimal$ebnf$3$subexpression$1$ebnf$1', symbols: [/[0-9]/] },
      {
        name: 'decimal$ebnf$3$subexpression$1$ebnf$1',
        symbols: ['decimal$ebnf$3$subexpression$1$ebnf$1', /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
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
      {
        name: 'decimal$ebnf$3',
        symbols: [],
        postprocess: function(d) {
          return null
        }
      },
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
      {
        name: 'jsonfloat$ebnf$1',
        symbols: [{ literal: '-' }],
        postprocess: id
      },
      {
        name: 'jsonfloat$ebnf$1',
        symbols: [],
        postprocess: function(d) {
          return null
        }
      },
      { name: 'jsonfloat$ebnf$2', symbols: [/[0-9]/] },
      {
        name: 'jsonfloat$ebnf$2',
        symbols: ['jsonfloat$ebnf$2', /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      { name: 'jsonfloat$ebnf$3$subexpression$1$ebnf$1', symbols: [/[0-9]/] },
      {
        name: 'jsonfloat$ebnf$3$subexpression$1$ebnf$1',
        symbols: ['jsonfloat$ebnf$3$subexpression$1$ebnf$1', /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
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
      {
        name: 'jsonfloat$ebnf$3',
        symbols: [],
        postprocess: function(d) {
          return null
        }
      },
      {
        name: 'jsonfloat$ebnf$4$subexpression$1$ebnf$1',
        symbols: [/[+-]/],
        postprocess: id
      },
      {
        name: 'jsonfloat$ebnf$4$subexpression$1$ebnf$1',
        symbols: [],
        postprocess: function(d) {
          return null
        }
      },
      { name: 'jsonfloat$ebnf$4$subexpression$1$ebnf$2', symbols: [/[0-9]/] },
      {
        name: 'jsonfloat$ebnf$4$subexpression$1$ebnf$2',
        symbols: ['jsonfloat$ebnf$4$subexpression$1$ebnf$2', /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
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
      {
        name: 'jsonfloat$ebnf$4',
        symbols: [],
        postprocess: function(d) {
          return null
        }
      },
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
        name: 'Main$ebnf$1$subexpression$1$ebnf$1',
        symbols: [{ literal: '\n' }]
      },
      {
        name: 'Main$ebnf$1$subexpression$1$ebnf$1',
        symbols: ['Main$ebnf$1$subexpression$1$ebnf$1', { literal: '\n' }],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      {
        name: 'Main$ebnf$1$subexpression$1',
        symbols: ['Main$ebnf$1$subexpression$1$ebnf$1', 'Statement'],
        postprocess: d => d[1][0]
      },
      {
        name: 'Main$ebnf$1',
        symbols: ['Main$ebnf$1', 'Main$ebnf$1$subexpression$1'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      { name: 'Main$ebnf$2', symbols: [] },
      {
        name: 'Main$ebnf$2',
        symbols: ['Main$ebnf$2', { literal: '\n' }],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      {
        name: 'Main',
        symbols: ['Statement', 'Main$ebnf$1', 'Main$ebnf$2'],
        postprocess: d => ({
          type: 'Program',
          body: reject(flatten(d), x => x === '\n'), // remove extra newlines
          meta: {
            parser
          }
        })
      },
      { name: 'Statement', symbols: ['EdgeChain'] },
      { name: 'Statement', symbols: ['IdentifierDefinition'] },
      { name: 'Statement', symbols: ['Comment'] },
      { name: 'Comment$ebnf$1', symbols: [] },
      {
        name: 'Comment$ebnf$1',
        symbols: ['Comment$ebnf$1', /[^\n]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      {
        name: 'Comment',
        symbols: [{ literal: '#' }, 'Comment$ebnf$1'],
        postprocess: d => ({
          type: 'Comment',
          value: d[1].join('').trim(),
          raw: d[0].concat(d[1].join(''))
        })
      },
      {
        name: 'EdgeChain$ebnf$1$subexpression$1$string$1',
        symbols: [{ literal: '-' }, { literal: '>' }],
        postprocess: function joiner(d) {
          return d.join('')
        }
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
      {
        name: 'EdgeChain$ebnf$1',
        symbols: ['EdgeChain$ebnf$1$subexpression$1']
      },
      {
        name: 'EdgeChain$ebnf$1$subexpression$2$string$1',
        symbols: [{ literal: '-' }, { literal: '>' }],
        postprocess: function joiner(d) {
          return d.join('')
        }
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
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
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
      {
        name: 'EdgeChain$ebnf$2',
        symbols: [],
        postprocess: function(d) {
          return null
        }
      },
      {
        name: 'EdgeChain',
        symbols: ['NodeList', 'EdgeChain$ebnf$1', 'EdgeChain$ebnf$2'],
        postprocess: d => ({
          type: 'EdgeChain',
          nodeLists: [d[0]].concat(d[1]),
          properties: d[2] || []
        })
      },
      { name: 'PropertyList$ebnf$1', symbols: [] },
      {
        name: 'PropertyList$ebnf$1$subexpression$1$subexpression$1',
        symbols: ['sl__']
      },
      {
        name: 'PropertyList$ebnf$1$subexpression$1$subexpression$1',
        symbols: ['sl_', { literal: ',' }, 'sl_']
      },
      {
        name: 'PropertyList$ebnf$1$subexpression$1',
        symbols: [
          'PropertyList$ebnf$1$subexpression$1$subexpression$1',
          'Property'
        ],
        postprocess: d => d[1]
      },
      {
        name: 'PropertyList$ebnf$1',
        symbols: ['PropertyList$ebnf$1', 'PropertyList$ebnf$1$subexpression$1'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
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
        postprocess: d => ({
          type: 'PropertyList',
          properties: [d[2]].concat(d[3])
        })
      },
      { name: 'Property$ebnf$1', symbols: [/[a-zA-Z_]/] },
      {
        name: 'Property$ebnf$1',
        symbols: ['Property$ebnf$1', /[a-zA-Z_]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
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
        postprocess: d => ({
          type: 'Property',
          name: d[0].join(''),
          value: d[4][0]
        })
      },
      { name: 'NodeList$ebnf$1', symbols: [] },
      {
        name: 'NodeList$ebnf$1$subexpression$1',
        symbols: ['sl_', { literal: ',' }, 'sl_', 'Node'],
        postprocess: d => d[3][0]
      },
      {
        name: 'NodeList$ebnf$1',
        symbols: ['NodeList$ebnf$1', 'NodeList$ebnf$1$subexpression$1'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      {
        name: 'NodeList',
        symbols: ['Node', 'NodeList$ebnf$1'],
        postprocess: d => ({
          type: 'NodeList',
          nodes: flatten(d)
        })
      },
      { name: 'Node', symbols: ['Identifier'] },
      { name: 'Node', symbols: ['Literal'] },
      {
        name: 'IdentifierDefinition',
        symbols: ['Identifier', 'sl_', { literal: '=' }, 'sl_', 'Literal'],
        postprocess: d => ({
          type: 'IdentifierDefinition',
          id: d[0],
          value: d[4]
        })
      },
      {
        name: 'Literal',
        symbols: ['dqstring'],
        postprocess: d => ({
          type: 'Literal',
          value: d[0]
        })
      },
      { name: 'Identifier$ebnf$1', symbols: [/[a-zA-Z_]/] },
      {
        name: 'Identifier$ebnf$1',
        symbols: ['Identifier$ebnf$1', /[a-zA-Z_]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      {
        name: 'Identifier',
        symbols: ['Identifier$ebnf$1'],
        postprocess: d => ({
          type: 'Identifier',
          name: d[0].join('')
        })
      },
      { name: 'sl_$ebnf$1', symbols: [] },
      {
        name: 'sl_$ebnf$1',
        symbols: ['sl_$ebnf$1', 'slwschar'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      { name: 'sl_', symbols: ['sl_$ebnf$1'], postprocess: nuller },
      { name: 'sl__$ebnf$1', symbols: ['slwschar'] },
      {
        name: 'sl__$ebnf$1',
        symbols: ['sl__$ebnf$1', 'slwschar'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      { name: 'sl__', symbols: ['sl__$ebnf$1'], postprocess: nuller },
      { name: 'slwschar', symbols: [/[ \t\v\f]/], postprocess: id }
    ],
    ParserStart: 'Main'
  }
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = grammar
  } else {
    window.grammar = grammar
  }
})()
