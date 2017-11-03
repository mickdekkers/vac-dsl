import R from 'ramda'
import execa from 'execa'
import _ from 'lodash'

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

export default commands => commands.forEach(runCommand)
