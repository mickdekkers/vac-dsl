import * as R from 'ramda'

export { default as sanityCheck } from './sanity-check'
export { default as extendableError } from './extendable-error'
export * from './ast'
export * from './command'

/**
 * Morph one object into another, modifying, adding and removing properties
 * according to a spec. This does not mutate the original object.
 * @param spec - A spec object
 * @param data - The object to morph
 * @returns An object morphed according to the spec
 */
export const morph = R.curry(
  (
    spec: { [name: string]: (obj: any) => any },
    data: { [name: string]: any }
  ): { [name: string]: any } =>
    R.pipe(
      R.converge(R.merge, [R.identity, R.applySpec(spec)]),
      // Remove keys whose value equals undefined
      R.reject(R.equals(undefined))
    )(data)
)

// FIXME: curried function signature broken
/**
 * Get all combinations of two lists using a combiner function
 */
export const getCombinationsWith = R.curry(
  <T, U>(combiner: (l: T, r: T) => U, left: T[], right: T[]): U[] =>
    R.map(R.apply(combiner), R.xprod(left, right))
)

// FIXME: curried function signature broken
/**
 * Combine adjacent elements of a list using a combiner function
 */
export const combineAdjacentWith = R.curry(
  <T, U>(combiner: (l: T, r: T) => U, list: T[]) =>
    R.map(R.apply(combiner), R.aperture(2, list))
)

/**
 * Define a subset of a type.
 * Specified keys must be present and the rest is optional.
 * @example
 * type Foo = {a: number, b: number, c: number}
 *
 * Subset<Foo, 'a'> === {a: number, b?: number, c?: number}
 *
 * Subset<Foo, 'a' | 'b'> === {a: number, b: number, c?: number}
 */
export type Subset<T, E extends keyof T> = Partial<T> & Pick<T, E>
