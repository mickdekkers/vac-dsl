import nearley from 'nearley'
import grammar from './grammar'
import { AST } from '@vac-dsl/core'

export default () => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))

  return (input: string): AST | undefined => {
    parser.feed(input)
    return parser.results[0]
  }
}
