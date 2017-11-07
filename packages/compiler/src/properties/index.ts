import didYouMean from 'didyoumean2'
import samplingRate from './sampling-rate'
import bitsPerSample from './bits-per-sample'
import channels from './channels'
import bufferMs from './buffer-ms'
import buffers from './buffers'
import priority from './priority'

// TODO: allow setting channel configuration (/ChanCfg)
export const propertyValidators = new Map([
  ['sampling_rate', samplingRate],
  ['bits_per_sample', bitsPerSample],
  ['channels', channels],
  ['buffer_ms', bufferMs],
  ['buffers', buffers],
  ['priority', priority]
])

export const propertyNames = Array.from(propertyValidators.keys())

export const didYouMeanProperty = input =>
  didYouMean(input, propertyNames, {
    returnType: 'all-sorted-matches'
  }).slice(0, 3)
