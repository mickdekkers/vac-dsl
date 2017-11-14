import getParser from './index'
import { AST, Command } from '@vac-dsl/core'
import * as basic from '@vac-dsl/core/src/__tests__/fixtures/programs/basic'

test('performs basic parsing', () => {
  const parser = getParser()
  const actual: AST | undefined = parser(basic.raw)
  const expected: AST = basic.ast

  expect(actual).toMatchObject(expected)
})
