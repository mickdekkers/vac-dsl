import * as changeCase from 'change-case'
import * as dedent from 'dedent'
import * as R from 'ramda'
import {
  propertyValidators,
  propertyNames,
  didYouMeanProperty
} from '../properties'
import { Subset, Command } from '@vac-dsl/core'

export type PropertyObject = { name: string; value: any }

/**
 * Reduce a list of properties to a PascalCase formatted property object
 * @param properties - A list of property objects with `{name, value}` fields
 * @returns An object containing the properties
 */
const propertiesListToObject = (
  properties: PropertyObject[] | null
): {
  [key: string]: any
} => {
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
export const assocCommandProperties = R.curry(
  (
    properties: PropertyObject[] | null,
    command: Partial<Command>
  ): Subset<Command, 'properties'> => {
    const propertiesObject = propertiesListToObject(properties)

    return R.assoc('properties', propertiesObject, command)
  }
)

/**
 * Validate a list of properties
 * @param properties - A list of properties to validate
 * @throws {Error} Will throw an error if any properties are invalid
 */
export const validateProperties = (properties: PropertyObject[]) => {
  properties.forEach(({ name, value }) => {
    // Check name
    if (!propertyNames.includes(name)) {
      const similar = didYouMeanProperty(name)
      const suggestions = similar.length ? similar : propertyNames

      // TODO: don't use dedent here, the .join is fragile
      throw new Error(dedent`
        Property "${name}" doesn't exist. Did you mean one of these?
        ${suggestions.map(entry => `  - ${entry}`).join('\n        ')}\n
      `)
    }

    // Check value
    const validator = propertyValidators.get(name)! // can never be undefined

    const { valid, msg } = validator.validate(value)
    if (!valid) {
      throw new Error(`Property ${name} ${msg}`)
    }
  })
}
