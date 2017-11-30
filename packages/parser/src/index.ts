import * as nearley from 'nearley'
import * as grammar from './grammar'
import { AST, traverse } from '@vac-dsl/core'
import * as lineColumn from 'line-column'
import * as _ from 'lodash'

/**
 * Add line and column information to location info
 */
const enhanceLoc = (ast: AST, lineColumnFinder: any): void => {
  traverse(ast, {
    '*': node => {
      const start = node.loc.start.index
      const end = node.loc.end!.index

      Object.assign(node.loc.start, lineColumnFinder.fromIndex(start))
      Object.assign(node.loc.end, lineColumnFinder.fromIndex(end))
    }
  })
}

// TODO: add 'finish' method which will throw if there's no parsing result
export default () => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))

  let inputBuffer = ''
  return (input: string): AST | undefined => {
    if (typeof input !== 'string') {
      throw new TypeError('input must be a string')
    }

    parser.feed(input)
    inputBuffer += input

    let results = parser.results[0]
    if (results) {
      results = _.cloneDeep(results)
      const lineColumnFinder = lineColumn(inputBuffer)
      enhanceLoc(results, lineColumnFinder)
    }

    return results
  }
}
