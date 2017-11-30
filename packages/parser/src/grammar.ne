# FIXME: formatting
@preprocessor typescript

@{%
  const pkg = require('read-pkg-up').sync().pkg

  const getLoc = (start, length) => ({
    start: { index: start },
    end: { index: start + length },
    length
  })
  // get node length
  const len = d => d && d.loc && d.loc.length ? d.loc.length : 0
  // get "primitive" (non-ast node) length
  const plen = d => d && d.length ? d.length: 0

  const log = d => (console.log(d), d)

  const parser = `${pkg.name}@${pkg.version}`
%}

# FIXME: the grammar is ambiguous around comments due to arbitrary whitespace:
# a = "A" # hi b = "B"
Main -> _ Statement (__ Statement {% d => ({
  value: d[1],
  length: plen(d[0]) + len(d[1])
})%}):* _ {% (d, idx) => ({
	type: "Program",
    body: [d[1]].concat(d[2].map(x => x.value)),
    meta: { parser },
	loc: getLoc(idx, plen(d[0]) + len(d[1]) + d[2].reduce((sum, x) => sum + x.length, 0) + plen(d[3]))
}) %}

# TODO: allow comment after statement
# TODO: create AST node for statements?
Statement -> (VariableDeclaration | EdgeChain | Comment) {% d => d[0][0] %}

Comment -> "#" [^\n]:* {% (d, idx) => ({
  type: "Comment",
  value: d[1].join('').trim(),
  raw: d[0].concat(d[1].join('')),
  loc: getLoc(idx, 1 + d[1].length)
}) %}

EdgeChain ->
  NodeList (sl_ "->" sl_ NodeList {% d => ({
      value: d[3],
      length: plen(d[0]) + 2 + plen(d[2]) + len(d[3])
    })%}):+
  (sl_ PropertyList {% d => ({
      value: d[1],
      length: plen(d[0]) + len(d[1])
    })%}):? {% (d, idx) => ({
    type: 'EdgeChain',
    nodeLists: [d[0]].concat(d[1].map(x => x.value)),
    properties: d[2] ? d[2].value : null,
    loc: getLoc(idx, len(d[0]) + d[1].reduce((sum, x) => sum + x.length, 0) + (d[2] ? d[2].length : 0))
  }) %}

PropertyList -> "["
    sl_ Property (delimiter Property {% d => ({
      value: d[1],
      length: plen(d[0]) + len(d[1])
    })%}):* sl_
  "]" {% (d, idx) => ({
    type: 'PropertyList',
    properties: [d[2]].concat(d[3].map(x => x.value)),
    loc: getLoc(idx, 1 + plen(d[1]) + len(d[2]) + d[3].reduce((sum, x) => sum + x.length, 0) + plen(d[4]) + 1)
  }) %}

Property -> [a-zA-Z0-9_]:+ sl_ "=" sl_ (jsonfloat | dqstring) {% (d, idx) => ({
  type: 'Property',
  name: d[0].join(''),
  value: d[4][0].value,
  loc: getLoc(idx, d[0].length + plen(d[1]) + 1 + plen(d[3]) + plen(d[4][0]))
}) %}

NodeList -> Node (delimiter Node {% d => ({
  value: d[1],
  length: plen(d[0]) + len(d[1])
})%}):* {% (d, idx) => ({
  type: 'NodeList',
  nodes: [d[0]].concat(d[1].map(x => x.value)),
  loc: getLoc(idx, len(d[0]) + d[1].reduce((sum, x) => sum + x.length, 0))
}) %}
Node -> (Identifier | Literal) {% d => d[0][0] %}

VariableDeclaration -> Identifier sl_ "=" sl_ Literal {% (d, idx) => ({
  type: 'VariableDeclaration',
  id: d[0],
  value: d[4],
  loc: getLoc(idx, len(d[0]) + plen(d[1]) + 1 + plen(d[3]) + len(d[4]))
}) %}

Literal -> dqstring {% (d, idx) => ({
  type: 'Literal',
  value: d[0].value,
  loc: getLoc(idx, d[0].length)
}) %}

Identifier -> [a-zA-Z0-9_]:+ {% (d, idx) => ({
  type: 'Identifier',
  name: d[0].join(''),
  loc: getLoc(idx, d[0].length)
}) %}

# Single-line whitespace or comma delimiter
delimiter -> (sl__ {% id %}| sl_ "," sl_ {% (d, idx) => ({
  length: plen(d[0]) + 1 + plen(d[2])
}) %}) {% id %}

###########################
# Re-implemented builtins #
# (added length tracking) #
###########################

# jsonfloat number
jsonfloat -> "-":? [0-9]:+ ("." [0-9]:+):? ([eE] [+-]:? [0-9]:+):? {% d => {
  const value =
    (d[0] || '') +
    d[1].join('') +
    (d[2] ? '.' + d[2][1].join('') : '') +
    (d[3] ? 'e' + (d[3][1] || '') + d[3][2].join('') : '')

  return {
    value: parseFloat(value),
	length: value.length
  }
} %}

# Double-quoted string
dqstring -> "\"" dstrchar:* "\"" {% d => {
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
} %}

dstrchar -> [^\\"\n] {% d => ({ value: d[0], length: 1 }) %}
    | "\\" strescape {%
    (d) => ({
	    value: JSON.parse("\""+d.join("")+"\""),
	    length: 1 + d[1].length
	})
%}

strescape -> ["\\/bfnrt] {% id %}
    | "u" [a-fA-F0-9] [a-fA-F0-9] [a-fA-F0-9] [a-fA-F0-9] {%
    function(d) {
        return d.join("");
    }
%}

# Single-line whitespace
sl_ -> slwschar:* {% (d) => ({ length: d[0].length }) %}
sl__ -> slwschar:+ {% (d) => ({ length: d[0].length }) %}
slwschar -> [ \t\v\f] {% id %}

# Whitespace
_  -> wschar:* {% (d) => ({ length: d[0].length }) %}
__ -> wschar:+ {% (d) => ({ length: d[0].length }) %}
wschar -> [ \t\n\v\f] {% id %}
