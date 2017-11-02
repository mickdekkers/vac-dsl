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
 * Get all combinations of two arrays using a combiner function
 */
export const getCombinationsWith = R.curry((combiner, left, right) =>
  R.map(R.apply(combiner), R.xprod(left, right))
)

/**
 * Combine adjacent elements of a list using a combiner function
 */
export const combineAdjacentWith = R.curry((combiner, list) => {
  return list.reduce((acc, el, index) => {
    const left = el
    const right = list[index + 1]

    if (right != null) {
      const combined = combiner(left, right)
      acc = acc.concat(combined)
    }

    return acc
  }, [])
})
