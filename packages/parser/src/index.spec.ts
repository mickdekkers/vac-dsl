import getParser from './index'
import { AST, Command } from '@vac-dsl/core'
import * as programBasicL from '@common-fixtures/programs/basic-literals'
import * as programBasicV from '@common-fixtures/programs/basic-variables'
// import * as programBasicM from '@common-fixtures/programs/basic-mixed'

test('performs basic parsing with literals', () => {
  const parser = getParser()
  const actual: AST | undefined = parser(programBasicL.raw)
  const expected: AST = programBasicL.ast

  expect(actual).toMatchObject(expected)
})

test('performs basic parsing with variables', () => {
  const parser = getParser()
  const actual: AST | undefined = parser(programBasicV.raw)
  const expected: AST = programBasicV.ast

  expect(actual).toMatchObject(expected)
})
