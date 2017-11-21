import { didYouMeanProperty } from './index'

test('didYouMeanProperty returns list of properties similar to input', () => {
  const actual = didYouMeanProperty('smapling_rate')
  expect(Array.isArray(actual)).toBe(true)
  expect(actual[0]).toBe('sampling_rate')
})

test('didYouMeanProperty returns empty array if nothing matches input', () => {
  const actual = didYouMeanProperty('qwertyuiopasdfghjklzxcvbnm')
  expect(Array.isArray(actual)).toBe(true)
  expect(actual.length).toBe(0)
})
