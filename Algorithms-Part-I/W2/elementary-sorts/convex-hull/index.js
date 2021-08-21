const Stack = require('../../stacks-and-queues/stack/Stack.js')
const { generatePoint2D } = require('./Point2D.js')

const hull = new Stack()

const p = generatePoint2D(10)

console.log(p)

module.exports = p
