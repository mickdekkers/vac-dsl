@{%
  const { reject } = require('lodash')
  const pkg = require('read-pkg-up').sync().pkg

  // This is apparently not as "built-in" as the docs suggest
  const nuller = d => null

  const log = d => (console.log(d), d)
  const flatten = arrays => Array.prototype.concat.apply([], arrays)
  const parser = `${pkg.name}@${pkg.version}`
%}

@builtin "string.ne"
@builtin "number.ne"

Main -> Statement ("\n":+ Statement {% d => d[1][0] %}):* "\n":* {% (d, idx) =>
({
  type: "Program",
  body: reject(flatten(d), x => x === '\n'), // remove extra newlines
  meta: {
	  parser
  },
  location: {
    start: idx
  }
}) %}

# TODO: allow comment after statement
# TODO: create AST node for statements?
Statement -> VariableDefinition | EdgeChain | Comment

Comment -> "#" [^\n]:* {% (d, idx) => ({
  type: "Comment",
  value: d[1].join('').trim(),
  raw: d[0].concat(d[1].join('')),
  location: {
    start: idx
  }
}) %}

EdgeChain ->
  NodeList (sl_ "->" sl_ NodeList {% d => d[3] %}):+
  (sl_ PropertyList {% d => d[1] %}):? {% (d, idx) => ({
    type: 'EdgeChain',
    nodeLists: [d[0]].concat(d[1]),
    properties: d[2] || [],
    location: {
      start: idx
    }
  }) %}

PropertyList -> "["
    sl_ Property (delimiter Property {% d => d[1] %}):* sl_
  "]" {% (d, idx) => ({
    type: 'PropertyList',
    properties: [d[2]].concat(d[3]),
    location: {
      start: idx
    }
  }) %}

Property -> [a-zA-Z_]:+ sl_ "=" sl_ (jsonfloat | dqstring) {% (d, idx) => ({
  type: 'Property',
  name: d[0].join(''),
  value: d[4][0],
  location: {
    start: idx
  }
}) %}

NodeList -> Node (delimiter Node {% d => d[1][0] %}):* {% (d, idx) => ({
  type: 'NodeList',
  nodes: flatten(d),
  location: {
    start: idx
  }
}) %}
Node -> Identifier | Literal

VariableDefinition -> Identifier sl_ "=" sl_ Literal {% (d, idx) => ({
  type: 'VariableDefinition',
  id: d[0],
  value: d[4],
  location: {
    start: idx
  }
}) %}

Literal -> dqstring {% (d, idx) => ({
  type: 'Literal',
  value: d[0],
  location: {
    start: idx
  }
}) %}

Identifier -> [a-zA-Z_]:+ {% (d, idx) => ({
  type: 'Identifier',
  name: d[0].join(''),
  location: {
    start: idx
  }
}) %}

# Single-line whitespace or comma delimiter
delimiter -> (sl__ | sl_ "," sl_)

# Single-line whitespace
sl_ -> slwschar:* {% nuller %}
sl__ -> slwschar:+ {% nuller %}
slwschar -> [ \t\v\f] {% id %}
