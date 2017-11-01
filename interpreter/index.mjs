import getCommands from './get-commands'
import crc32 from 'crc-32'
import R from 'ramda'
import { morph } from '../utils'

// VAC has a limit on the number of characters in a device name
const capDeviceName = deviceName => deviceName.slice(0, 31).trim()
const capCommandDeviceNames = R.evolve({
  from: capDeviceName,
  to: capDeviceName
})

const getHash = str => (crc32.str(str) >>> 0).toString(16)

const addCommandHash = morph({ hash: ({ from, to }) => getHash(from + to) })

export default program => {
  const commands = getCommands(program).map(
    R.pipe(capCommandDeviceNames, addCommandHash)
  )

  return commands
}
