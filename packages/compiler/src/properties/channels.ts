import is from 'is_js'
import PropertyValidator from './property-validator'

export default new PropertyValidator([
  [is.number, 'must be a number'],
  [is.integer, 'must be a whole number'],
  [x => x >= 1 && x <= 8, 'must be between 1 and 8']
])
