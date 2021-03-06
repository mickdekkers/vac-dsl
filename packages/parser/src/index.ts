import * as nearley from 'nearley'
import * as grammar from './grammar'
import { AST } from '@vac-dsl/core'

// TODO: add 'finish' method which will throw if there's no parsing result
export default () => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))

  return (input: string): AST | undefined => {
    if (typeof input !== 'string') {
      throw new TypeError('input must be a string')
    }

    parser.feed(input)
    return parser.results[0]
  }
}
