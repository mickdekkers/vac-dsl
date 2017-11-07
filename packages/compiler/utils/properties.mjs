import changeCase from 'change-case'
import dedent from 'dedent'
import R from 'ramda'
import {
  propertyValidators,
  propertyNames,
  didYouMeanProperty
} from '../properties'

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
  const propertiesObject = propertiesListToObject(properties)

  return R.assoc('properties', propertiesObject, command)
})

export const validateProperties = properties => {
  if (properties == null) {
    return
  }

  properties.forEach(({ name, value }) => {
    // Check name
    if (!propertyNames.includes(name)) {
      const similar = didYouMeanProperty(name)
      const suggestions = similar.length ? similar : propertyNames

      throw new Error(dedent`
        Property "${name}" doesn't exist. Did you mean one of these?
        ${suggestions.map(ap => `  - ${ap}`).join('\n        ')}\n
      `)
    }

    // Check value
    const validator = propertyValidators.get(name)
    const { valid, msg } = validator.validate(value)
    if (!valid) {
      throw new Error(`Property ${name} ${msg}`)
    }
  })
}
