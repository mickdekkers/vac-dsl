import * as is from 'is_js'
import PropertyValidator from './property-validator'

export default new PropertyValidator([
  [is.number, 'must be a number'],
  [is.integer, 'must be a whole number'],
  [(x: number) => x >= 5 && x <= 10000, 'must be between 5 and 10,000']
])
