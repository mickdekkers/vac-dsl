import { morph, getCombinationsWith, combineAdjacentWith } from './index'

describe('morph', () => {
  it('modifies properties according to spec', () => {
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

  it('removes properties whose spec returns undefined', () => {
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

  it('adds properties defined by the spec', () => {
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

  it('does not mutate the input object', () => {
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
})

describe('getCombinationsWith', () => {
  it('combines two lists with a combiner function', () => {
    const combiner = (a, b) => a + b

    const left = ['a', 'b', 'c']
    const right = ['1', '2', '3']

    const actual = getCombinationsWith(combiner, left, right)

    // prettier-ignore
    expect(actual).toEqual([
      'a1', 'a2', 'a3',
      'b1', 'b2', 'b3',
      'c1', 'c2', 'c3',
    ])
  })
})

describe('combineAdjacentWith', () => {
  it('combines adjacent elements of a list with a combiner function', () => {
    const combiner = (a, b) => a + b

    const list = ['a', 'b', 'c', 'd']

    const actual = combineAdjacentWith(combiner, list)

    expect(actual).toEqual(['ab', 'bc', 'cd'])
  })
})
