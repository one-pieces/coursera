class Stack {
    constructor() {
        this.stack = []
    }

    pop() {
        return this.stack.splice(-1)[0]
    }

    peek() {
        return this.stack.slice(-1)[0]
    }

    push(v) {
        this.stack.push(v)
    }
}

module.exports = Stack