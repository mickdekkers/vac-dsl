const getParser = require('@vac-dsl/parser').default
const compiler = require('@vac-dsl/compiler').default
const { paramCase, camelCase } = require('change-case')
const { format } = require('prettier')

const formatCode = code => format(code, { semi: false, singleQuote: true })
const stripMeta = ast => (ast ? Object.assign({}, ast, { meta: {} }) : ast)

// TODO: extract all this except codegen into package

const generateFixtureCode = (name, program, results) => {
  const fixtureCode = formatCode(`
    import { AST, Command } from '@vac-dsl/core'

    export const program: string = \`${program}\`

    export const ast: AST = ${JSON.stringify(results.ast)}

    export const commands: Command[] = ${JSON.stringify(results.commands)}
  `)

  return fixtureCode
}

const generateParserTestCode = (name, program, results) => {
  const testCode = {
    import: '',
    body: ''
  }

  const varName = '$' + camelCase(name)
  const filename = paramCase(name)

  testCode.import = formatCode(
    `import * as ${varName} from '@common-fixtures/programs/${filename}'`
  )

  testCode.body = formatCode(`
    test('parses program: ${filename}', () => {
      const parser = getParser()
      const actual: AST | undefined = parser(${varName}.program)
      const expected: AST = ${varName}.ast

      expect(actual).toMatchObject(expected)
    })
  `)

  return testCode
}

const generateCompilerTestCode = (name, program, results) => {
  const testCode = {
    import: '',
    body: ''
  }

  const varName = '$' + camelCase(name)
  const filename = paramCase(name)

  testCode.import = formatCode(
    `import * as ${varName} from '@common-fixtures/programs/${filename}'`
  )

  testCode.body = formatCode(`
    test('compiles program: ${filename}', () => {
      const actual: Command[] = compiler(${varName}.ast)
      const expected: Command[] = ${varName}.commands

      expect(actual).toEqual(expected)
    })
  `)

  return testCode
}

const testProgram = (name, program) => {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('name must be a non-empty string')
  }
  if (typeof program !== 'string' || program.length === 0) {
    throw new Error('program must be a non-empty string')
  }

  const results = {
    ok: false,
    // Parser results
    parsed: false,
    incomplete: false,
    parseError: null,
    ast: undefined,
    // Compiler results
    compiled: false,
    compileError: null,
    commands: undefined
  }

  const parser = getParser()

  try {
    results.ast = stripMeta(parser(program))
  } catch (error) {
    results.parseError = error
  }

  // ast can also be undefined if no error was thrown,
  // so we check this here instead of in the catch
  if (results.ast !== undefined) {
    results.parsed = true

    try {
      results.commands = compiler(results.ast)
      results.compiled = true
    } catch (error) {
      results.compileError = error
    }
  }

  // If the program failed to parse and there is no parse error, it's incomplete
  results.incomplete = !results.parsed && !results.parseError
  results.ok = results.parsed && results.compiled

  return results
}

module.exports = {
  testProgram,
  generateFixtureCode,
  generateParserTestCode,
  generateCompilerTestCode
}
