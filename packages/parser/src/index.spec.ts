import * as $2To_1Mixed from '@common-fixtures/programs/2-to-1-mixed'
import * as $2To_1Variables from '@common-fixtures/programs/2-to-1-variables'
import * as $2To_1Literals from '@common-fixtures/programs/2-to-1-literals'
import * as $basicMixed from '@common-fixtures/programs/basic-mixed'
import * as $basicVariables from '@common-fixtures/programs/basic-variables'
import * as $basicLiterals from '@common-fixtures/programs/basic-literals'
import { AST, Command } from '@vac-dsl/core'
import getParser from './index'

test('throws on invalid syntax', () => {
  const parser = getParser()

  expect(() => {
    parser('a -> .')
  }).toThrow(/invalid syntax/)
})

test('returns undefined on incomplete but possibly valid code', () => {
  const parser = getParser()

  const actual = parser('a -> ')
  expect(actual).toBeUndefined()
})

test('parses program: basic-literals', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($basicLiterals.program)
  const expected: AST = $basicLiterals.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: basic-variables', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($basicVariables.program)
  const expected: AST = $basicVariables.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: basic-mixed', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($basicMixed.program)
  const expected: AST = $basicMixed.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: 2-to-1-literals', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($2To_1Literals.program)
  const expected: AST = $2To_1Literals.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: 2-to-1-variables', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($2To_1Variables.program)
  const expected: AST = $2To_1Variables.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: 2-to-1-mixed', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($2To_1Mixed.program)
  const expected: AST = $2To_1Mixed.ast

  expect(actual).toMatchObject(expected)
})
