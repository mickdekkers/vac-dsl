const path = require('path')
const { paramCase } = require('change-case')
const fs = require('mz/fs')
const gitUsername = require('git-user-name')
const {
  testProgram,
  generateFixtureCode,
  generateParserTestCode,
  generateCompilerTestCode
} = require('./plop-templates/test-program')

const packagesDir = path.resolve(__dirname, 'packages')
const programFixturesDir = path.resolve(
  packagesDir,
  'core/src/__tests__/fixtures/programs'
)
const pkgNameRgx = /^(?:@([a-z]+(?:[-_][a-z]+)*)\/)?([a-z]+(?:[-_][a-z]+)*)$/
const initialPkgVersion = '0.1.0'

module.exports = plop => {
  // get a package's unscoped package name from its raw name
  plop.setHelper('unscope', text => text.match(pkgNameRgx)[2])

  // get the current year
  plop.setHelper('currentYear', () => new Date().getFullYear())

  // create package
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
      },
      {
        type: 'add',
        path: 'packages/{{kebabCase (unscope name)}}/LICENSE',
        templateFile: 'plop-templates/package/LICENSE'
      }
    ]
  })

  // create tests
  plop.setGenerator('test-program', {
    description: 'create parser and compiler tests for a specific program',
    prompts: [
      {
        name: 'programName',
        type: 'input',
        message: 'Program name:',
        validate: answer => answer.length > 0
      },
      {
        name: 'programContents',
        type: 'editor',
        message: 'Program contents:',
        validate: answer => answer.length > 0
      },
      {
        name: 'addToTests',
        type: 'checkbox',
        message: 'Add to tests (index.spec.ts) of:',
        choices: [
          {
            name: 'Parser',
            checked: true
          },
          {
            name: 'Compiler',
            checked: true
          }
        ]
      }
    ],
    actions: answers => {
      const actions = [
        answers => {
          const testResults = testProgram(
            answers.programName,
            answers.programContents
          )

          if (!testResults.ok) {
            if (testResults.incomplete) {
              throw new Error('Program failed to parse: program is incomplete')
            } else if (testResults.parseError) {
              const error = new Error(
                `Program failed to parse:\n${testResults.parseError.message}`
              )
              console.error(testResults.parseError.stack)
              error.testResults = testResults
              throw error
            } else if (testResults.compileError) {
              const error = new Error(
                `Program failed to compile:\n${testResults.compileError
                  .message}`
              )
              error.testResults = testResults
              throw error
            } else {
              const error = new Error("This shouldn't happen...")
              error.testResults = testResults
              throw error
            }
          }

          // Attach testResults to answers object so we can use it below
          Object.assign(answers, { testResults })
          return 'Program parsed and compiled'
        },
        answers => {
          // TODO: only generate test code if option is selected
          Object.assign(answers, {
            fixtureCode: generateFixtureCode(
              answers.programName,
              answers.programContents,
              answers.testResults
            ),
            parserTestCode: generateParserTestCode(
              answers.programName,
              answers.programContents,
              answers.testResults
            ),
            compilerTestCode: generateCompilerTestCode(
              answers.programName,
              answers.programContents,
              answers.testResults
            )
          })
          return 'Program fixture and test code generated'
        },
        async answers => {
          const filePath = path.join(
            programFixturesDir,
            paramCase(answers.programName) + '.ts'
          )

          await fs.writeFile(filePath, answers.fixtureCode, {
            encoding: 'utf8',
            flag: 'wx'
          })

          return 'Program fixture file created'
        }
      ]

      if (answers.addToTests.includes('Parser')) {
        actions.push(async answers => {
          const filePath = path.join(packagesDir, 'parser/src/index.spec.ts')

          let testFileContents = await fs.readFile(filePath, 'utf8')

          testFileContents =
            answers.parserTestCode.import +
            testFileContents +
            '\n' +
            answers.parserTestCode.body

          await fs.writeFile(filePath, testFileContents, 'utf8')

          return 'Parser test added'
        })
      }

      if (answers.addToTests.includes('Compiler')) {
        actions.push(async answers => {
          const filePath = path.join(packagesDir, 'compiler/src/index.spec.ts')

          let testFileContents = await fs.readFile(filePath, 'utf8')

          testFileContents =
            answers.compilerTestCode.import +
            testFileContents +
            '\n' +
            answers.compilerTestCode.body

          await fs.writeFile(filePath, testFileContents, 'utf8')

          return 'Compiler test added'
        })
      }

      return actions
    }
  })
}
