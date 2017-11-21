import * as is from 'is_js'
import PropertyValidator from './property-validator'

test('takes a list of validations and runs them in .validate()', () => {
  const pv = new PropertyValidator([
    [is.number, 'must be a number'],
    [is.integer, 'must be a whole number'],
    [(x: number) => x >= 1 && x <= 256, 'must be between 1 and 256']
  ])

  // Fails first validation
  {
    const actual = pv.validate('foo')
    expect(actual).toMatchObject({
      valid: false,
      msg: expect.stringMatching(/must be a number/)
    })
  }
  // Fails second validation
  {
    const actual = pv.validate(1.2)
    expect(actual).toMatchObject({
      valid: false,
      msg: expect.stringMatching(/must be a whole number/)
    })
  }
  // Fails third validation
  {
    const actual = pv.validate(-1)
    expect(actual).toMatchObject({
      valid: false,
      msg: expect.stringMatching(/must be between/)
    })
  }
  // Passes all validations
  {
    const actual = pv.validate(4)
    expect(actual).toMatchObject({
      valid: true,
      msg: null
    })
  }
})
