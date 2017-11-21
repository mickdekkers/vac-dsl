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
import compiler from './index'

test('returns empty array if no connections are defined', () => {
  const actual: Command[] = compiler({
    type: 'Program',
    body: [
      {
        type: 'VariableDeclaration',
        id: { type: 'Identifier', name: 'a', loc: { start: { index: 0 } } },
        value: { type: 'Literal', value: 'A', loc: { start: { index: 4 } } },
        loc: { start: { index: 0 } }
      }
    ],
    meta: {},
    loc: { start: { index: 0 } }
  })

  expect(Array.isArray(actual)).toBe(true)
  expect(actual).toHaveLength(0)
})

test('compiles program: basic-literals', () => {
  const actual: Command[] = compiler($basicLiterals.ast)
  const expected: Command[] = $basicLiterals.commands

  expect(actual).toEqual(expected)
})

test('compiles program: basic-variables', () => {
  const actual: Command[] = compiler($basicVariables.ast)
  const expected: Command[] = $basicVariables.commands

  expect(actual).toEqual(expected)
})

test('compiles program: basic-mixed', () => {
  const actual: Command[] = compiler($basicMixed.ast)
  const expected: Command[] = $basicMixed.commands

  expect(actual).toEqual(expected)
})

test('compiles program: 2-to-1-literals', () => {
  const actual: Command[] = compiler($2To_1Literals.ast)
  const expected: Command[] = $2To_1Literals.commands

  expect(actual).toEqual(expected)
})

test('compiles program: 2-to-1-variables', () => {
  const actual: Command[] = compiler($2To_1Variables.ast)
  const expected: Command[] = $2To_1Variables.commands

  expect(actual).toEqual(expected)
})

test('compiles program: 2-to-1-mixed', () => {
  const actual: Command[] = compiler($2To_1Mixed.ast)
  const expected: Command[] = $2To_1Mixed.commands

  expect(actual).toEqual(expected)
})

test('compiles program: chain-literals', () => {
  const actual: Command[] = compiler($chainLiterals.ast)
  const expected: Command[] = $chainLiterals.commands

  expect(actual).toEqual(expected)
})

test('compiles program: chain-variables', () => {
  const actual: Command[] = compiler($chainVariables.ast)
  const expected: Command[] = $chainVariables.commands

  expect(actual).toEqual(expected)
})

test('compiles program: chain-mixed', () => {
  const actual: Command[] = compiler($chainMixed.ast)
  const expected: Command[] = $chainMixed.commands

  expect(actual).toEqual(expected)
})

test('compiles program: 1-to-2-literals', () => {
  const actual: Command[] = compiler($1To_2Literals.ast)
  const expected: Command[] = $1To_2Literals.commands

  expect(actual).toEqual(expected)
})

test('compiles program: 1-to-2-variables', () => {
  const actual: Command[] = compiler($1To_2Variables.ast)
  const expected: Command[] = $1To_2Variables.commands

  expect(actual).toEqual(expected)
})

test('compiles program: 1-to-2-mixed', () => {
  const actual: Command[] = compiler($1To_2Mixed.ast)
  const expected: Command[] = $1To_2Mixed.commands

  expect(actual).toEqual(expected)
})

test('compiles program: 3-to-2-to-3-variables', () => {
  const actual: Command[] = compiler($3To_2To_3Variables.ast)
  const expected: Command[] = $3To_2To_3Variables.commands

  expect(actual).toEqual(expected)
})

test('compiles program: 12-chain-literals', () => {
  const actual: Command[] = compiler($12ChainLiterals.ast)
  const expected: Command[] = $12ChainLiterals.commands

  expect(actual).toEqual(expected)
})

test('compiles program: properties-basic', () => {
  const actual: Command[] = compiler($propertiesBasic.ast)
  const expected: Command[] = $propertiesBasic.commands

  expect(actual).toEqual(expected)
})

test('compiles program: properties-scientific-notation', () => {
  const actual: Command[] = compiler($propertiesScientificNotation.ast)
  const expected: Command[] = $propertiesScientificNotation.commands

  expect(actual).toEqual(expected)
})

test('compiles program: multi-shared-variables', () => {
  const actual: Command[] = compiler($multiSharedVariables.ast)
  const expected: Command[] = $multiSharedVariables.commands

  expect(actual).toEqual(expected)
})

test('compiles program: properties-multi', () => {
  const actual: Command[] = compiler($propertiesMulti.ast)
  const expected: Command[] = $propertiesMulti.commands

  expect(actual).toEqual(expected)
})
