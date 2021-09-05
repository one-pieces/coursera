export class WQuickUnionUF {
    constructor(N) {
        this.sz = []
        this.id = []
        for (let i = 0; i < N; i++) {
            this.id[i] = i
            this.sz[i] = 1
        }
    }
    root(i) {
        while(i !== this.id[i]) {
            // path compression
            this.id[i] = this.id[this.id[i]]
            i = this.id[i]
        }
        return i
    }
    connected(p, q) {
        console.time('connected')
        const result = this.root(p) === this.root(q)
        console.timeEnd('connected')
        return result
    }
    union(p, q) {
        const i = this.root(p)
        const j = this.root(q)
        if (i === j) return
        if (this.sz[i] < this.sz[j]) {
            this.id[i] = j
            this.sz[j] += this.sz[i]
        } else {
            this.id[j] = i
            this.sz[i] += this.sz[j]
        }
    }
    // 查找所有顶点元素
    findApex() {
        const result = []
        for (let i = 0; i < this.id.length; i++) {
            if (i === this.id[i]) {
                result.push(i)
            }
        }
        return result
    }
    // 查找 i 所在集合的所有元素
    find(p) {
        const result = []
        const root = this.root(p)
        for (let i = 0; i < this.id.length; i++) {
            const _root = this.root(i)
            if (_root === root) {
                result.push(i)
            }
        }
        return result
    }
    findAll(threshold = 5) {
        const map = {}
        for (let i = 0; i < this.id.length; i++) {
            const root = this.root(i)
            let row = map[root] || []
            row.push(i)
            map[root] = row
        }
        Object.keys(map).forEach(key => {
            const row = map[key]
            if (row.length < threshold) {
                delete map[key]
            }
        })
        return map
    }
}

export function useUnionFind(data, rowWidth) {
    const quickUnion = new WQuickUnionUF(data.length)
    for (let i = 0; i < data.length; i++) {
        const col = i % rowWidth
        const row = Math.floor(i / rowWidth)
        // 如果不是第一列，则检查当前 i 和其左侧是否连通
        if (col !== 0) {
            const left = i - 1
            if (data[left] === data[i]) {
                quickUnion.union(left, i)
            }
        }
        // 如果不是第一行，则检查当前 i 和其上侧是否连通
        if (row !== 0) {
            const up = i - rowWidth
            if (data[up] === data[i]) {
                quickUnion.union(up, i)
            }
        }
    }
    // const areas = quickUnion.findAll(20)
    // const apex = quickUnion.findApex()
    // console.log('apex num: ', Object.keys(areas).length, apex.length)
    // console.log(areas)
    return quickUnion
}