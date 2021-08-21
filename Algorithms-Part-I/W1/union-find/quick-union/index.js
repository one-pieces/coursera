class QuickUnionUF {
    constructor(N) {
        this.id = []
        for (let i = 0; i < N; i++) {
            this.id[i] = i
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
        this.id[i] = j
    }
}

module.exports = QuickUnionUF