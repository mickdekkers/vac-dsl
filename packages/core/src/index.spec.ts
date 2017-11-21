import { morph, getCombinationsWith, combineAdjacentWith } from './index'

// TODO: write tests for core
test('morph modifies properties according to spec', () => {
  const foo = {
    a: 'a',
    b: 'b'
  }

  const spec = {
    a: obj => obj.a.toUpperCase()
  }

  const actual = morph(spec, foo)

  expect(actual).toEqual({
    a: 'A',
    b: 'b'
  })
})

test('morph removes properties whose spec returns undefined', () => {
  const foo = {
    a: 'a',
    b: 'b'
  }

  const spec = {
    a: () => undefined
  }

  const actual = morph(spec, foo)

  expect(actual).toEqual({
    b: 'b'
  })
})

test('morph adds properties defined by the spec', () => {
  const foo = {
    a: 'a',
    b: 'b'
  }

  const spec = {
    c: obj => obj.a + obj.b
  }

  const actual = morph(spec, foo)

  expect(actual).toEqual({
    a: 'a',
    b: 'b',
    c: 'ab'
  })
})

test('morph does not mutate the input object', () => {
  const foo = {
    a: 'a',
    b: 'b'
  }

  const spec = {
    a: obj => obj.a.toUpperCase(),
    b: () => undefined,
    c: obj => obj.a + obj.b
  }

  const actual = morph(spec, foo)

  // Check result
  expect(actual).toEqual({
    a: 'A',
    c: 'ab'
  })
  // Check original object
  expect(foo).toEqual({
    a: 'a',
    b: 'b'
  })
})
