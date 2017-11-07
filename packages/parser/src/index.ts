import nearley from 'nearley'
import grammar from './grammar'
export * from './ast'

export default () => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))

  return (input: string): any[] => {
    parser.feed(input)
    return parser.results[0]
  }
}
