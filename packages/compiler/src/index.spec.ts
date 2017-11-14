import compiler from './index'
import { AST, Command } from '@vac-dsl/core'
import * as basic from '@vac-dsl/core/src/__tests__/fixtures/programs/basic'

test('performs basic compilation', () => {
  const actual: Command[] = compiler(basic.ast)
  const expected: Command[] = basic.commands

  expect(actual).toEqual(expected)
})
