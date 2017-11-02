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
      { name: 'main$ebnf$1', symbols: [] },
      {
        name: 'main$ebnf$1$subexpression$1$ebnf$1',
        symbols: [{ literal: '\n' }]
      },
      {
        name: 'main$ebnf$1$subexpression$1$ebnf$1',
        symbols: ['main$ebnf$1$subexpression$1$ebnf$1', { literal: '\n' }],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      {
        name: 'main$ebnf$1$subexpression$1',
        symbols: ['main$ebnf$1$subexpression$1$ebnf$1', 'stmt'],
        postprocess: d => d[1][0]
      },
      {
        name: 'main$ebnf$1',
        symbols: ['main$ebnf$1', 'main$ebnf$1$subexpression$1'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      { name: 'main$ebnf$2', symbols: [] },
      {
        name: 'main$ebnf$2',
        symbols: ['main$ebnf$2', { literal: '\n' }],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      {
        name: 'main',
        symbols: ['stmt', 'main$ebnf$1', 'main$ebnf$2'],
        postprocess: d => ({
          type: 'Program',
          body: reject(flatten(d), x => x === '\n'), // remove extra newlines
          meta: {
            parser
          }
        })
      },
      { name: 'stmt', symbols: ['edgeChain'] },
      { name: 'stmt', symbols: ['idDef'] },
      { name: 'stmt', symbols: ['comment'] },
      { name: 'comment$ebnf$1', symbols: [] },
      {
        name: 'comment$ebnf$1',
        symbols: ['comment$ebnf$1', /[^\n]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      {
        name: 'comment',
        symbols: [{ literal: '#' }, 'comment$ebnf$1'],
        postprocess: d => ({
          type: 'Comment',
          value: d[1].join('').trim(),
          raw: d[0].concat(d[1].join(''))
        })
      },
      {
        name: 'edgeChain$ebnf$1$subexpression$1$string$1',
        symbols: [{ literal: '-' }, { literal: '>' }],
        postprocess: function joiner(d) {
          return d.join('')
        }
      },
      {
        name: 'edgeChain$ebnf$1$subexpression$1',
        symbols: [
          'sl_',
          'edgeChain$ebnf$1$subexpression$1$string$1',
          'sl_',
          'nodeList'
        ],
        postprocess: d => d[3]
      },
      {
        name: 'edgeChain$ebnf$1',
        symbols: ['edgeChain$ebnf$1$subexpression$1']
      },
      {
        name: 'edgeChain$ebnf$1$subexpression$2$string$1',
        symbols: [{ literal: '-' }, { literal: '>' }],
        postprocess: function joiner(d) {
          return d.join('')
        }
      },
      {
        name: 'edgeChain$ebnf$1$subexpression$2',
        symbols: [
          'sl_',
          'edgeChain$ebnf$1$subexpression$2$string$1',
          'sl_',
          'nodeList'
        ],
        postprocess: d => d[3]
      },
      {
        name: 'edgeChain$ebnf$1',
        symbols: ['edgeChain$ebnf$1', 'edgeChain$ebnf$1$subexpression$2'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      {
        name: 'edgeChain',
        symbols: ['nodeList', 'edgeChain$ebnf$1'],
        postprocess: d => ({
          type: 'EdgeChain',
          nodeLists: flatten(d)
        })
      },
      { name: 'nodeList$ebnf$1', symbols: [] },
      {
        name: 'nodeList$ebnf$1$subexpression$1',
        symbols: ['sl_', { literal: ',' }, 'sl_', 'node'],
        postprocess: d => d[3][0]
      },
      {
        name: 'nodeList$ebnf$1',
        symbols: ['nodeList$ebnf$1', 'nodeList$ebnf$1$subexpression$1'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      {
        name: 'nodeList',
        symbols: ['node', 'nodeList$ebnf$1'],
        postprocess: d => ({
          type: 'NodeList',
          nodes: flatten(d)
        })
      },
      { name: 'node', symbols: ['id'] },
      { name: 'node', symbols: ['literal'] },
      {
        name: 'idDef',
        symbols: ['id', 'sl_', { literal: '=' }, 'sl_', 'literal'],
        postprocess: d => ({
          type: 'IdentifierDefinition',
          id: d[0],
          value: d[4]
        })
      },
      {
        name: 'literal',
        symbols: ['dqstring'],
        postprocess: d => ({
          type: 'Literal',
          value: d[0]
        })
      },
      { name: 'id$ebnf$1', symbols: [/[a-zA-Z_]/] },
      {
        name: 'id$ebnf$1',
        symbols: ['id$ebnf$1', /[a-zA-Z_]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]])
        }
      },
      {
        name: 'id',
        symbols: ['id$ebnf$1'],
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
    ParserStart: 'main'
  }
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = grammar
  } else {
    window.grammar = grammar
  }
})()
