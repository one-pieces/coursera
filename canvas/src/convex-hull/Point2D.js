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

export function generatePoint2D(N, xMax = 500, yMax = 500) {
    const result = []
    for (let i = 0; i < N; i++) {
        const x = Math.floor(Math.random() * xMax)
        const y = Math.floor(Math.random() * yMax)
        result.push(new Point2D(x, y, i))
    }
    return result
}

export function generatePoint2DByIndex(indexList, rowWidth = 500) {
    const result = []
    for (let i = 0; i < indexList.length; i++) {
        const index = indexList[i]
        const x = index % rowWidth
        const y = Math.floor(index / rowWidth)
        result.push(new Point2D(x, y, index))
    }
    return result
}