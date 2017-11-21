import sanityCheck from './sanity-check'

describe('sanityCheck', () => {
  it('throws with message if condition is false', () => {
    expect(() => {
      sanityCheck('a'.length > 1, 'string length mismatch')
    }).toThrow(/mismatch/)
  })

  it('does not throw if condition is true', () => {
    expect(() => {
      sanityCheck(true, 'this will never happen')
    }).not.toThrow()
  })
})
