<template>
    <canvas ref="canvas" id="canvas" width="500" height="500"></canvas>
</template>

<script>
import { ref, onMounted } from 'vue'
import { generatePoint2D } from '../convex-hull/Point2D.js'
import { convexHull } from '../convex-hull/index.js'
import { useCanvas, useDrawPoint, useDrawPath } from '../utils/canvas'

export default {
  setup() {
    const canvas = ref(null)
    onMounted(() => {
      const ctx = useCanvas(canvas.value)

      const pointList = generatePoint2D(10, 500, 500)
      pointList.forEach(p => useDrawPoint(ctx, p, false))
      const hull = convexHull(pointList)
      useDrawPath(ctx, hull)
    })
    return {
      canvas,
    }
  },
}
</script>