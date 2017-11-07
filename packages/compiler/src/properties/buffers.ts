import is from 'is_js'
import PropertyValidator from './property-validator'

export default new PropertyValidator([
  [is.number, 'must be a number'],
  [is.integer, 'must be a whole number'],
  [(x: number) => x >= 1 && x <= 256, 'must be between 1 and 256']
])
