- refactor to typescript
- write tests
- use lint-staged
- use semantic-release
- prevent circular references -- Edge case: two different input and output devices have the same name
- write compiler error system with line and column numbers (will need to have compiler optionally (?) consume raw input in addition to AST)
- refactor interpreter
- find a good name for the project
- consider creating a (simple) electron app as a GUI for non-programmer users
- offer pre-built binaries for end-users

execa definitions changes:
- added documentation to everything
- fixed being unable to pass boolean to `shell` option due to intersection type issues
- restructured the .d.ts to use namespace so that things like execa.ExecaChildProcess are exported and available for use. based on chroma-js typings.
