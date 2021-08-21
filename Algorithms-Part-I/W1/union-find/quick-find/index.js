class QuickFindUF {
    constructor(N) {
        this.id = []
        for (let i = 0; i < N; i++) {
            this.id[i] = i
        }
    }
    connected(p, q) {
        return this.id[p] === this.id[q]
    }
    union(p, q) {
        const pid = this.id[p]
        const qid = this.id[q]
        for (let i = 0; i < this.id.length; i++) {
            if (pid === this.id[i]) {
                this.id[i] = qid
            }
        }
    }
}

module.exports = QuickFindUF