import sanityCheck from './sanity-check'

test('sanity check throws with message if condition is false', () => {
  expect(() => {
    sanityCheck('a'.length > 1, 'string length mismatch')
  }).toThrow(/mismatch/)
})

test('sanity check does not throw if condition is true', () => {
  expect(() => {
    sanityCheck(true, 'this will never happen')
  }).not.toThrow()
})
