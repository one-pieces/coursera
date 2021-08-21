const QuickUnionUF = require('./index.js')

const quickUnion = new QuickUnionUF(10)

quickUnion.union(0, 5)
quickUnion.union(5, 6)
quickUnion.union(6, 1)
quickUnion.union(7, 2)
quickUnion.union(2, 1)
quickUnion.union(9, 4)
quickUnion.union(4, 3)
quickUnion.union(3, 8)

console.log('id: ', quickUnion.id)
console.log('6, 7: ', quickUnion.connected(6, 7))
console.log('6, 9: ', quickUnion.connected(6, 9))
