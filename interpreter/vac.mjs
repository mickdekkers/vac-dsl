import getCommands from './get-commands'
import crc32 from 'crc-32'
import R from 'ramda'
import { morph } from '../utils'
import execa from 'execa'
import _ from 'lodash'

// VAC has a limit on the number of characters in a device name
const capDeviceName = deviceName => deviceName.slice(0, 31).trim()
const capCommandDeviceNames = R.evolve({
  from: capDeviceName,
  to: capDeviceName
})

const getHash = str => (crc32.str(str) >>> 0).toString(16)

const addCommandHash = morph({ hash: ({ from, to }) => getHash(from + to) })

// TODO: refactor this
const runCommand = command => {
  let args = [
    '/AutoStart',
    `/WindowName: "vac-dsl-${command.hash}"`,
    `/Input: "${command.from}"`,
    `/Output: "${command.to}"`
  ]

  args = args.concat(
    _.map(
      command.properties,
      (value, key) => `/${key}: ${JSON.stringify(value)}`
    )
  )

  // return args

  return execa('audiorepeater', args, { shell: true })
}

export default program => {
  const commands = getCommands(program).map(
    R.pipe(capCommandDeviceNames, addCommandHash)
  )

  return commands.map(runCommand)
  // .map(x => x.join('\n'))
  // .join('\n===\n')
}
