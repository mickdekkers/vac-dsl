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

# TODO: implement lexer to obtain line numbers
# TODO: capitalize rule name
# TODO: don't be so iffy about newlines and consider switching whitespace to allow newlines anywhere

Main -> Statement ("\n":+ Statement {% d => d[1][0] %}):* "\n":* {% d => ({
  type: "Program",
  body: reject(flatten(d), x => x === '\n'), // remove extra newlines
  meta: {
	  parser
  }
}) %}

# TODO: allow comment after statement
Statement -> EdgeChain | IdentifierDefinition | Comment

# TODO: multiline comments?
Comment -> "#" [^\n]:* {% d => ({
  type: "Comment",
  value: d[1].join('').trim(),
  raw: d[0].concat(d[1].join(''))
}) %}

EdgeChain -> NodeList (sl_ "->" sl_ NodeList {% d => d[3] %}):+ {% d => ({
  type: 'EdgeChain',
  nodeLists: flatten(d)
}) %}

NodeList -> Node (sl_ "," sl_ Node {% d => d[3][0] %}):* {% d => ({
  type: 'NodeList',
  nodes: flatten(d)
}) %}
Node -> Identifier | Literal

IdentifierDefinition -> Identifier sl_ "=" sl_ Literal {% d => ({
  type: 'IdentifierDefinition',
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

# Single-line whitespace
sl_ -> slwschar:* {% nuller %}
sl__ -> slwschar:+ {% nuller %}
slwschar -> [ \t\v\f] {% id %}
