class WQuickUnionUF {
    constructor(N) {
        this.sz = []
        this.id = []
        for (let i = 0; i < N; i++) {
            this.id[i] = i
            this.sz[i] = 1
        }
    }
    root(i) {
        while(i !== this.id[i]) i = this.id[i]
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
}

module.exports = WQuickUnionUF