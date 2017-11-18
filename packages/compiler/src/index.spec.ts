import * as $2To_1Mixed from '@common-fixtures/programs/2-to-1-mixed'
import * as $2To_1Variables from '@common-fixtures/programs/2-to-1-variables'
import * as $2To_1Literals from '@common-fixtures/programs/2-to-1-literals'
import * as $basicMixed from '@common-fixtures/programs/basic-mixed'
import * as $basicVariables from '@common-fixtures/programs/basic-variables'
import * as $basicLiterals from '@common-fixtures/programs/basic-literals'
import { AST, Command } from '@vac-dsl/core'
import compiler from './index'

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
