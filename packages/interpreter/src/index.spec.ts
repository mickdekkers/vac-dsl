jest.mock('execa')
import { AST, Command } from '@vac-dsl/core'
import interpreter from './index'

const getWindowRegex = hash => new RegExp(`/WindowName: "[^"]*${hash}[^"]*"`)

const execa: jest.Mock = require('execa')
beforeEach(() => {
  execa.mockClear()
})

test('enables autostart on spawned audiorepeaters', () => {
  const commands: Command[] = [
    {
      from: 'a',
      to: 'b',
      properties: {},
      hash: '9e83486d'
    },
    {
      from: 'b',
      to: 'c',
      properties: {},
      hash: 'c2a92b38'
    }
  ]

  interpreter(commands)
  const args1 = execa.mock.calls[0][1]
  const args2 = execa.mock.calls[1][1]

  expect(args1).toContain('/AutoStart')
  expect(args2).toContain('/AutoStart')
})

test('sets window name based on command.hash', () => {
  const commands: Command[] = [
    {
      from: 'a',
      to: 'b',
      properties: {},
      hash: '9e83486d'
    },
    {
      from: 'b',
      to: 'c',
      properties: {},
      hash: 'c2a92b38'
    }
  ]

  interpreter(commands)
  const args1 = execa.mock.calls[0][1]
  const args2 = execa.mock.calls[1][1]

  expect(args1.find(x => getWindowRegex(commands[0].hash).test(x))).toBeTruthy()
  expect(args2.find(x => getWindowRegex(commands[1].hash).test(x))).toBeTruthy()
})

test('sets input argument to command.from', () => {
  const commands: Command[] = [
    {
      from: 'a',
      to: 'b',
      properties: {},
      hash: '9e83486d'
    },
    {
      from: 'b',
      to: 'c',
      properties: {},
      hash: 'c2a92b38'
    }
  ]

  interpreter(commands)
  const args1 = execa.mock.calls[0][1]
  const args2 = execa.mock.calls[1][1]

  expect(args1).toContain(`/Input: "${commands[0].from}"`)
  expect(args2).toContain(`/Input: "${commands[1].from}"`)
})

test('sets output argument to command.to', () => {
  const commands: Command[] = [
    {
      from: 'a',
      to: 'b',
      properties: {},
      hash: '9e83486d'
    },
    {
      from: 'b',
      to: 'c',
      properties: {},
      hash: 'c2a92b38'
    }
  ]

  interpreter(commands)
  const args1 = execa.mock.calls[0][1]
  const args2 = execa.mock.calls[1][1]

  expect(args1).toContain(`/Output: "${commands[0].to}"`)
  expect(args2).toContain(`/Output: "${commands[1].to}"`)
})

test('adds command.properties as arguments', () => {
  const commands: Command[] = [
    {
      from: 'a',
      to: 'b',
      properties: {
        SamplingRate: 96000,
        Buffers: 12,
        Priority: 'high'
      },
      hash: '9e83486d'
    },
    {
      from: 'b',
      to: 'c',
      properties: {
        BufferMs: 100,
        Buffers: 12,
        Priority: 'low'
      },
      hash: 'c2a92b38'
    }
  ]

  interpreter(commands)
  const args1 = execa.mock.calls[0][1]
  const args2 = execa.mock.calls[1][1]

  expect(args1).toContain('/SamplingRate: 96000')
  expect(args1).toContain('/Buffers: 12')
  expect(args1).toContain('/Priority: "high"')

  expect(args2).toContain('/BufferMs: 100')
  expect(args2).toContain('/Buffers: 12')
  expect(args2).toContain('/Priority: "low"')
})
