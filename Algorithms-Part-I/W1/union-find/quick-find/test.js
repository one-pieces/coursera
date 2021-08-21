const QuickFindUF = require('./index.js')

const quickFind = new QuickFindUF(10)

quickFind.union(0, 5)
quickFind.union(5, 6)
quickFind.union(6, 1)
quickFind.union(7, 2)
quickFind.union(2, 1)
quickFind.union(9, 4)
quickFind.union(4, 3)
quickFind.union(3, 8)

console.log('id: ', quickFind.id)
console.log('6, 7: ', quickFind.connected(6, 7))
console.log('6, 9: ', quickFind.connected(6, 9))
