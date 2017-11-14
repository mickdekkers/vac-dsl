const gitUsername = require('git-user-name')

const pkgNameRgx = /^(?:@([a-z]+(?:[-_][a-z]+)*)\/)?([a-z]+(?:[-_][a-z]+)*)$/
const initialPkgVersion = '0.1.0'

module.exports = plop => {
  // get a package's unscoped package name from its raw name
  plop.setHelper('unscope', text => text.match(pkgNameRgx)[2])

  // create package generator
  plop.setGenerator('package', {
    description: 'create a new @vac-dsl package',
    prompts: [
      {
        name: 'name',
        type: 'input',
        message: 'Package name:',
        validate: answer =>
          pkgNameRgx.test(answer) ? true : 'Please enter a valid package name'
      },
      {
        name: 'description',
        type: 'input',
        message: 'Package description:'
      },
      {
        name: 'author',
        type: 'input',
        message: 'Package author:',
        default: () => gitUsername() || ''
      },
      {
        name: 'private',
        type: 'confirm',
        message: 'Private:',
        default: false
      },
      // This is a dummy prompt which is just used to mutate the handlebars data
      // as per https://github.com/amwmedia/plop/issues/88
      {
        name: 'dummy',
        type: 'input',
        when: data => (
          Object.assign(data, { version: initialPkgVersion }), false
        )
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'packages/{{kebabCase (unscope name)}}',
        templateFiles: ['plop-templates/package/**/*'],
        base: 'plop-templates/package'
      }
    ]
  })
}
