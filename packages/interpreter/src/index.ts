import * as R from 'ramda'
import * as execa from 'execa'
import * as _ from 'lodash'
import { Command } from '@vac-dsl/core'

// TODO: refactor this
const runCommand = (command: Command): execa.ExecaChildProcess => {
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

  return execa('audiorepeater', args, { windowsVerbatimArguments: true })
}

export default (commands: Command[]): void => commands.forEach(runCommand)
