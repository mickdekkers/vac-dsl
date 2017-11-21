import { AST, Command } from '@vac-dsl/core'

export const program: string = `# Hello, I am a comment
`

export const ast: AST = {
  type: 'Program',
  body: [
    {
      type: 'Comment',
      value: 'Hello, I am a comment',
      raw: '# Hello, I am a comment',
      loc: { start: { index: 0 } }
    }
  ],
  meta: {},
  loc: { start: { index: 0 } }
}

export const commands: Command[] = []
