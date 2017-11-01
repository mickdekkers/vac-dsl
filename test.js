const fs = require('fs')
const vacDsl = require('./index')
const input = fs.readFileSync('./program.vac', 'utf8')

console.log(vacDsl(input))
