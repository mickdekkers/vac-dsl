import getParser from './parser'
import interpreter from './interpreter/vac'
import fs from 'fs'

const parser = getParser()

export default input => {
  const ast = parser(input)

  if (ast == null) {
    throw new Error('Invalid or empty program')
  }

  return interpreter(ast)
}
