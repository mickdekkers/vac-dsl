import * as $commentMulti from '@common-fixtures/programs/comment-multi'
import * as $commentBasic from '@common-fixtures/programs/comment-basic'
import * as $commentOnly from '@common-fixtures/programs/comment-only'
import * as $propertiesMulti from '@common-fixtures/programs/properties-multi'
import * as $multiSharedVariables from '@common-fixtures/programs/multi-shared-variables'
import * as $propertiesScientificNotation from '@common-fixtures/programs/properties-scientific-notation'
import * as $propertiesBasic from '@common-fixtures/programs/properties-basic'
import * as $12ChainLiterals from '@common-fixtures/programs/12-chain-literals'
import * as $3To_2To_3Variables from '@common-fixtures/programs/3-to-2-to-3-variables'
import * as $1To_2Mixed from '@common-fixtures/programs/1-to-2-mixed'
import * as $1To_2Variables from '@common-fixtures/programs/1-to-2-variables'
import * as $1To_2Literals from '@common-fixtures/programs/1-to-2-literals'
import * as $chainMixed from '@common-fixtures/programs/chain-mixed'
import * as $chainVariables from '@common-fixtures/programs/chain-variables'
import * as $chainLiterals from '@common-fixtures/programs/chain-literals'
import * as $2To_1Mixed from '@common-fixtures/programs/2-to-1-mixed'
import * as $2To_1Variables from '@common-fixtures/programs/2-to-1-variables'
import * as $2To_1Literals from '@common-fixtures/programs/2-to-1-literals'
import * as $basicMixed from '@common-fixtures/programs/basic-mixed'
import * as $basicVariables from '@common-fixtures/programs/basic-variables'
import * as $basicLiterals from '@common-fixtures/programs/basic-literals'
import { AST, Command } from '@vac-dsl/core'
import getParser from './index'

test('throws on invalid input argument', () => {
  const parser = getParser()

  expect(() => {
    parser(undefined as any)
  }).toThrow(/must be a string/)
  expect(() => {
    parser(null as any)
  }).toThrow(/must be a string/)
  expect(() => {
    parser(1 as any)
  }).toThrow(/must be a string/)
  expect(() => {
    parser({} as any)
  }).toThrow(/must be a string/)
})

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

test('parses program: chain-literals', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($chainLiterals.program)
  const expected: AST = $chainLiterals.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: chain-variables', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($chainVariables.program)
  const expected: AST = $chainVariables.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: chain-mixed', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($chainMixed.program)
  const expected: AST = $chainMixed.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: 1-to-2-literals', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($1To_2Literals.program)
  const expected: AST = $1To_2Literals.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: 1-to-2-variables', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($1To_2Variables.program)
  const expected: AST = $1To_2Variables.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: 1-to-2-mixed', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($1To_2Mixed.program)
  const expected: AST = $1To_2Mixed.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: 3-to-2-to-3-variables', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($3To_2To_3Variables.program)
  const expected: AST = $3To_2To_3Variables.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: 12-chain-literals', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($12ChainLiterals.program)
  const expected: AST = $12ChainLiterals.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: properties-basic', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($propertiesBasic.program)
  const expected: AST = $propertiesBasic.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: properties-scientific-notation', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($propertiesScientificNotation.program)
  const expected: AST = $propertiesScientificNotation.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: multi-shared-variables', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($multiSharedVariables.program)
  const expected: AST = $multiSharedVariables.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: properties-multi', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($propertiesMulti.program)
  const expected: AST = $propertiesMulti.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: comment-only', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($commentOnly.program)
  const expected: AST = $commentOnly.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: comment-basic', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($commentBasic.program)
  const expected: AST = $commentBasic.ast

  expect(actual).toMatchObject(expected)
})

test('parses program: comment-multi', () => {
  const parser = getParser()
  const actual: AST | undefined = parser($commentMulti.program)
  const expected: AST = $commentMulti.ast

  expect(actual).toMatchObject(expected)
})
