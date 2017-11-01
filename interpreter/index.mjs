import getCommands from './get-commands'

// VAC has a limit on the number of characters in a device name
const capDeviceName = deviceName => deviceName.slice(0, 31).trim()
const capCommandDeviceNames = command =>
  Object.assign({}, command, {
    from: capDeviceName(command.from),
    to: capDeviceName(command.to)
  })

export default (program) => {
  const commands = getCommands(program).map(capCommandDeviceNames)

  return commands
}
