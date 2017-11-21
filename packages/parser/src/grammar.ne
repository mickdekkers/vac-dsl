@preprocessor typescript

@{%
  const { reject } = require('lodash')
  const pkg = require('read-pkg-up').sync().pkg

  // This is apparently not as "built-in" as the docs suggest
  const nuller = d => null

  const log = d => (console.log(d), d)
  const flatten = arrays => Array.prototype.concat.apply([], arrays)
  const parser = `${pkg.name}@${pkg.version}`
%}

@builtin "whitespace.ne"
@builtin "string.ne"
@builtin "number.ne"

# FIXME: the grammar is ambigious around comments due to arbitrary whitespace:
# a = "A" # hi b = "B"
Main -> _ Statement (__ Statement {% d => d[1][0] %}):* _ {% (d, idx) =>
({
  type: "Program",
  body: reject(flatten(d), x => x === null), // remove nulls from whitespace
  meta: {
	  parser
  },
  loc: {
    start: { index: idx }
  }
}) %}

# TODO: allow comment after statement
# TODO: create AST node for statements?
Statement -> VariableDeclaration | EdgeChain | Comment

Comment -> "#" [^\n]:* {% (d, idx) => ({
  type: "Comment",
  value: d[1].join('').trim(),
  raw: d[0].concat(d[1].join('')),
  loc: {
    start: { index: idx }
  }
}) %}

EdgeChain ->
  NodeList (sl_ "->" sl_ NodeList {% d => d[3] %}):+
  (sl_ PropertyList {% d => d[1] %}):? {% (d, idx) => ({
    type: 'EdgeChain',
    nodeLists: [d[0]].concat(d[1]),
    properties: d[2] || null,
    loc: {
      start: { index: idx }
    }
  }) %}

PropertyList -> "["
    sl_ Property (delimiter Property {% d => d[1] %}):* sl_
  "]" {% (d, idx) => ({
    type: 'PropertyList',
    properties: [d[2]].concat(d[3]),
    loc: {
      start: { index: idx }
    }
  }) %}

Property -> [a-zA-Z0-9_]:+ sl_ "=" sl_ (jsonfloat | dqstring) {% (d, idx) => ({
  type: 'Property',
  name: d[0].join(''),
  value: d[4][0],
  loc: {
    start: { index: idx }
  }
}) %}

NodeList -> Node (delimiter Node {% d => d[1][0] %}):* {% (d, idx) => ({
  type: 'NodeList',
  nodes: flatten(d),
  loc: {
    start: { index: idx }
  }
}) %}
Node -> Identifier | Literal

VariableDeclaration -> Identifier sl_ "=" sl_ Literal {% (d, idx) => ({
  type: 'VariableDeclaration',
  id: d[0],
  value: d[4],
  loc: {
    start: { index: idx }
  }
}) %}

Literal -> dqstring {% (d, idx) => ({
  type: 'Literal',
  value: d[0],
  loc: {
    start: { index: idx }
  }
}) %}

Identifier -> [a-zA-Z0-9_]:+ {% (d, idx) => ({
  type: 'Identifier',
  name: d[0].join(''),
  loc: {
    start: { index: idx }
  }
}) %}

# Single-line whitespace or comma delimiter
delimiter -> (sl__ | sl_ "," sl_)

# Single-line whitespace
sl_ -> slwschar:* {% nuller %}
sl__ -> slwschar:+ {% nuller %}
slwschar -> [ \t\v\f] {% id %}
