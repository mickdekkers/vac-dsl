import R from 'ramda'

// Morph one object into another, modifying, adding and removing properties according to a spec
// (does not mutate the original object)
export const morph = R.curry((spec, data) =>
  R.pipe(
    R.converge(R.merge, [R.identity, R.applySpec(spec)]),
    // Remove keys whose value equals undefined
    R.reject(R.equals(undefined))
  )(data)
)

/**
 * Get all combinations of two lists using a combiner function
 */
export const getCombinationsWith = R.curry((combiner, left, right) =>
  R.map(R.apply(combiner), R.xprod(left, right))
)

/**
 * Combine adjacent elements of a list using a combiner function
 */
export const combineAdjacentWith = R.curry((combiner, list) =>
  R.map(R.apply(combiner), R.aperture(2, list))
)
