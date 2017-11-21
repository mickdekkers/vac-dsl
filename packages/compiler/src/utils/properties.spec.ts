import { assocCommandProperties, validateProperties } from './properties'

/**************************
 * assocCommandProperties *
 **************************/

test('assocCommandProperties adds list of properties to command', () => {
  const properties = [{ name: 'foo', value: 1 }, { name: 'bar', value: 'baz' }]
  const command = {
    from: 'a',
    to: 'b'
  }

  const actual = assocCommandProperties(properties, command)
  expect(actual).toEqual({
    from: 'a',
    to: 'b',
    properties: {
      Foo: 1,
      Bar: 'baz'
    }
  })
})

test('assocCommandProperties adds empty object to command on empty input', () => {
  const command = {
    from: 'a',
    to: 'b'
  }

  // Empty properties array
  {
    const actual = assocCommandProperties([], command)
    expect(actual).toEqual({
      from: 'a',
      to: 'b',
      properties: {}
    })
  }
  // Null properties arg
  {
    const actual = assocCommandProperties(null, command)
    expect(actual).toEqual({
      from: 'a',
      to: 'b',
      properties: {}
    })
  }
})

/**********************
 * validateProperties *
 **********************/

test('validateProperties throws with suggestions if any property name is invalid', () => {
  const properties = [
    { name: 'buffers', value: 12 },
    { name: 'smapling_rate', value: 96000 }
  ]

  expect(() => {
    validateProperties(properties)
  }).toThrow(/property ".+?" doesn't exist[\s\S]+- sampling_rate/i)
})

test('validateProperties throws if any property value is invalid', () => {
  const properties = [
    { name: 'buffers', value: 12 },
    { name: 'sampling_rate', value: 900 }
  ]

  expect(() => {
    validateProperties(properties)
  }).toThrow(/sampling_rate must be between/)
})

test('validateProperties does not throw if all properties are valid', () => {
  const properties = [
    { name: 'buffers', value: 12 },
    { name: 'sampling_rate', value: 96000 }
  ]

  expect(() => {
    validateProperties(properties)
  }).not.toThrow()
})
