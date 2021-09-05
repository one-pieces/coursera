import { Stack } from './Stack.js'
import { Point2D } from './Point2D.js'

export function convexHull(points) {
    const hull = new Stack()
    // 根据 y 坐标从小到大排列
    points.sort((a, b) => b.y - a.y)
    // 根据 points[0] 与各点的极斜角（polar angle）从小到大排序
    const p0 = points[0]
    points.sort((a, b) => {
        const dy1 = a.y - p0.y
        const dy2 = b.y - p0.y
        if (dy1 === 0 && dy2 === 0) {
            // p0, a, b 水平
            return 0
        } else if (dy1 >= 0 && dy2 < 0) {
            // a 在 p0 上面，b 在 p0 下面
            return -1
        } else if (dy2 >= 0 && dy1 < 0) {
            // a 在 p0 下面，b 在 p0 上面
            return 1
        } else {
            // a，b 同时在 p0 的上面或下面
            return -Point2D.ccw(p0, a, b)
        }
    })
    
    // console.log(points)
    hull.push(points[0])
    hull.push(points[1])

    for (let i = 2; i < points.length; i ++) {
        let top = hull.pop()
        while(hull.peek() && Point2D.ccw(hull.peek(), top, points[i]) <= 0) {
            top = hull.pop()
        }
        hull.push(top)
        hull.push(points[i])
    }
    // console.log('hull: ', hull)
    return hull
}