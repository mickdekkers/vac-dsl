import changeCase from 'change-case'
import dedent from 'dedent'
import didYouMean from 'didyoumean2'
import R from 'ramda'

/**
 * Reduce a list of properties to a PascalCase formatted property object
 * @param properties - A list of property objects with `{name, value}` fields
 * @returns An object containing the properties
 */
const propertiesListToObject = properties => {
  if (properties == null) {
    return {}
  }

  return properties.reduce(
    (acc, prop) => R.assoc(changeCase.pascalCase(prop.name), prop.value, acc),
    {}
  )
}

/**
 * Associate a list of properties with a command
 * @param properties - A list of properties to associate with the command
 * @param command - A command object to associate the properties with
 * @returns A command object with a `properties` field containing the properties
 */
export const assocCommandProperties = R.curry((properties, command) => {
  const props = propertiesListToObject(properties)

  return R.assoc('properties', props, command)
})

const allowedProperties = new Set([
  'sampling_rate',
  'bits_per_sample',
  'channels',
  'buffer_ms',
  'buffers',
  'priority'
])

const suggestProperties = input =>
  didYouMean(input, Array.from(allowedProperties), {
    returnType: 'all-sorted-matches'
  }).slice(0, 3)

// TODO: validate property values
export const validateProperties = properties => {
  if (properties == null) {
    return
  }

  properties.forEach(property => {
    const prop = property.name
    if (!allowedProperties.has(prop)) {
      const similar = suggestProperties(prop)
      const suggestions = similar.length
        ? similar
        : Array.from(allowedProperties)

      throw new Error(dedent`
        Property "${prop}" doesn't exist. Did you mean one of these?
        ${suggestions.map(ap => `  - ${ap}`).join('\n        ')}\n
      `)
    }
  })
}
