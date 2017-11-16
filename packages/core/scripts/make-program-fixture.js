const getParser = require('@vac-dsl/parser').default
const compiler = require('@vac-dsl/compiler').default
const interpreter = require('@vac-dsl/interpreter').default
const fs = require('fs')
const path = require('path')
const { paramCase } = require('change-case')
const { format } = require('prettier')

const template = (raw, ast, commands) => {
  let astType
  if (ast == null) {
    astType = 'null'
  } else {
    astType = 'AST'
    ast = Object.assign(ast, { meta: {} })
  }

  let result = `
    import { AST, Command } from '@vac-dsl/core'

    export const raw: string = \`${raw}\`

    export const ast: ${astType} = ${JSON.stringify(ast) || null}

    ${commands == null ? '' : `export const commands: Command[] = ${JSON.stringify(commands)}`}
  `

  return format(result, { semi: false, singleQuote: true })
}

const parser = getParser()

const getFileContents = (input) => {
  let ast
  try {
    ast = parser(input)
  } finally {
    if (ast == null) {
      return template(input)
    }
  }

  let commands
  try {
    commands = compiler(ast)
  } finally {
    if (commands != null) {
      return template(input, ast, commands)
    } else {
      return template(input, ast)
    }
  }
}

module.exports = (name, input, force = false) => {
  const contents = getFileContents(input)
  const dir = path.resolve(__dirname, '../src/__tests__/fixtures/programs')
  const p = path.join(dir, paramCase(name) + '.ts')

  fs.writeFileSync(p, contents, { encoding: 'utf8', flag: force ? 'w' : 'wx' })
}
