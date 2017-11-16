import compiler from './index'
import { AST, Command } from '@vac-dsl/core'
import * as programBasicL from '@common-fixtures/programs/basic-literals'
import * as programBasicV from '@common-fixtures/programs/basic-variables'
import * as programBasicM from '@common-fixtures/programs/basic-mixed'

test('performs basic compilation with literals', () => {
  const actual: Command[] = compiler(programBasicL.ast)
  const expected: Command[] = programBasicL.commands

  expect(actual).toEqual(expected)
})

test('performs basic compilation with variables', () => {
  const actual: Command[] = compiler(programBasicV.ast)
  const expected: Command[] = programBasicV.commands

  expect(actual).toEqual(expected)
})

test('performs basic compilation with both variables and literals', () => {
  const actual: Command[] = compiler(programBasicM.ast)
  const expected: Command[] = programBasicM.commands

  expect(actual).toEqual(expected)
})
