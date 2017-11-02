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
        name: 'EdgeChain',
        symbols: ['NodeList', 'EdgeChain$ebnf$1'],
        postprocess: d => ({
          type: 'EdgeChain',
          nodeLists: flatten(d)
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
