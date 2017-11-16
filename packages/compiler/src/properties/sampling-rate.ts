import * as is from 'is_js'
import PropertyValidator from './property-validator'

export default new PropertyValidator([
  [is.number, 'must be a number'],
  [is.integer, 'must be a whole number'],
  [(x: number) => x >= 1000 && x <= 384000, 'must be between 1,000 and 384,000']
])
