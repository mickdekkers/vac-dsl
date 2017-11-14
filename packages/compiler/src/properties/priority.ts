import * as is from 'is_js'
import * as humanizeList from 'humanize-list'
import PropertyValidator from './property-validator'

const validPriorities = new Set(['normal', 'high', 'realtime'])
const validPrioritiesString: string = humanizeList(
  Array.from(validPriorities.values()).map(x => `"${x}"`),
  {
    oxfordComma: true,
    conjunction: 'or'
  }
)

export default new PropertyValidator([
  [is.string, 'must be a string'],
  [x => validPriorities.has(x), `can only be ${validPrioritiesString}`]
])
