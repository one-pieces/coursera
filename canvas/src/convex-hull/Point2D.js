export class Point2D {
    static ccw(a, b, c) {
        const area2 = (b.x - a.x) * (c.y-a.y) - (b.y - a.y) * (c.x - a.x)
        if (area2 < 0) {
            return -1
        }
        if (area2 > 0) {
            return 1
        }
        return 0
    }
    constructor(x, y, n) {
        this.x = x
        this.y = y
        this.n = n
    }
}

export function generatePoint2D(N) {
    const result = []
    for (let i = 0; i< N; i++) {
        const x = Math.floor(Math.random() * 500)
        const y = Math.floor(Math.random() * 500)
        result.push(new Point2D(x, y, i))
    }
    return result
}