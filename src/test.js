const fs = require('fs')
const vacDsl = require('./index')
const input = fs.readFileSync('./program.vac', 'utf8')

const result = vacDsl(input)
console.log(result)
