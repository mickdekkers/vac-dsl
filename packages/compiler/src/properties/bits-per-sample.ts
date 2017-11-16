import * as is from 'is_js'
import * as humanizeList from 'humanize-list'
import PropertyValidator from './property-validator'

const validBps = new Set([8, 16, 18, 20, 22, 24, 32])
const validBpsString: string = humanizeList(Array.from(validBps.values()), {
  oxfordComma: true,
  conjunction: 'or'
})

export default new PropertyValidator([
  [is.number, 'must be a number'],
  [is.integer, 'must be a whole number'],
  [x => validBps.has(x), `can only be ${validBpsString}`]
])
