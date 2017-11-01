@{%
  // This is apparently not as "built-in" as the docs suggest
  const nuller = d => null
  const log = d => (console.log(d), d)
  const flatten = arrays => Array.prototype.concat.apply([], arrays)
  const pkg = require('./package.json')
  const parser = `${pkg.name}@${pkg.version}`
  const { reject } = require('lodash')
%}

@builtin "string.ne"

main -> stmt ("\n":+ stmt {% d => d[1][0] %}):* "\n":* {% d => ({
  type: "Program",
  body: reject(flatten(d), x => x === '\n'), // remove extra newlines
  meta: {
	  parser
  }
}) %}

stmt -> edge | idDef | comment

# TODO: multiline comments
comment -> "#" [^\n]:* {% d => ({
  type: "Comment",
  value: d[1].join('').trim(),
  raw: d[0].concat(d[1].join(''))
}) %}

edge -> node sl_ "->" sl_ node {% d => ({
  type: "Edge",
  from: d[0][0],
  to: d[4][0]
}) %}

node -> id | literal

idDef -> id sl_ "=" sl_ literal {% d => ({
  type: 'IdentifierDefinition',
  id: d[0],
  value: d[4]
}) %}

literal -> dqstring {% d => ({
  type: 'Literal',
  value: d[0]
}) %}

id -> [a-zA-Z_]:+ {% d => ({
  type: 'Identifier',
  name: d[0].join('')
}) %}

# Single-line whitespace
sl_ -> slwschar:* {% nuller %}
sl__ -> slwschar:+ {% nuller %}
slwschar -> [ \t\v\f] {% id %}
