@{%
  // This is apparently not as "built-in" as the docs suggest
  const nuller = d => null
  const log = d => (console.log(d), d)
  const flatten = arrays => Array.prototype.concat.apply([], arrays)
  const pkg = require('read-pkg-up').sync()
  const parser = `${pkg.name}@${pkg.version}`
  const { reject } = require('lodash')
%}

@builtin "string.ne"
@builtin "number.ne"

Main -> Statement ("\n":+ Statement {% d => d[1][0] %}):* "\n":* {% d => ({
  type: "Program",
  body: reject(flatten(d), x => x === '\n'), // remove extra newlines
  meta: {
	  parser
  }
}) %}

# TODO: allow comment after statement
Statement -> VariableDefinition | EdgeChain | Comment

Comment -> "#" [^\n]:* {% d => ({
  type: "Comment",
  value: d[1].join('').trim(),
  raw: d[0].concat(d[1].join(''))
}) %}

EdgeChain ->
  NodeList (sl_ "->" sl_ NodeList {% d => d[3] %}):+
  (sl_ PropertyList {% d => d[1] %}):? {% d => ({
    type: 'EdgeChain',
    nodeLists: [d[0]].concat(d[1]),
    properties: d[2] || []
  }) %}

PropertyList -> "["
    sl_ Property (delimiter Property {% d => d[1] %}):* sl_
  "]" {% d => ({
    type: 'PropertyList',
    properties: [d[2]].concat(d[3])
  }) %}

Property -> [a-zA-Z_]:+ sl_ "=" sl_ (jsonfloat | dqstring) {% d => ({
  type: 'Property',
  name: d[0].join(''),
  value: d[4][0]
}) %}

NodeList -> Node (delimiter Node {% d => d[1][0] %}):* {% d => ({
  type: 'NodeList',
  nodes: flatten(d)
}) %}
Node -> Identifier | Literal

VariableDefinition -> Identifier sl_ "=" sl_ Literal {% d => ({
  type: 'VariableDefinition',
  id: d[0],
  value: d[4]
}) %}

Literal -> dqstring {% d => ({
  type: 'Literal',
  value: d[0]
}) %}

Identifier -> [a-zA-Z_]:+ {% d => ({
  type: 'Identifier',
  name: d[0].join('')
}) %}

# Single-line whitespace or comma delimiter
delimiter -> (sl__ | sl_ "," sl_)

# Single-line whitespace
sl_ -> slwschar:* {% nuller %}
sl__ -> slwschar:+ {% nuller %}
slwschar -> [ \t\v\f] {% id %}
