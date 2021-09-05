<template>
    <canvas ref="canvas" id="canvas" :width="width" :height="height"></canvas>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { generatePoint2DByIndex } from '../convex-hull/Point2D.js'
import { convexHull } from '../convex-hull/index.js'
import { 
    useCanvas,
    useDrawPath, 
    useDrawImage,
    useMultiLevelImg,
    useFeatureData,
    useColorMap,
    useColorfulArea,
} from '../utils/canvas'
import {
    useUnionFind,
} from '../utils/quick-union'

async function drawImg(ctx, src, width, height) {
    await useDrawImage(ctx, src, 0, 0, width, height)
    // 转化为二值图，像素值为 255 或 0
    // useBinaryImg(ctx, width, height)
    // 转化为多值图，像素值被分为多个区间
    useMultiLevelImg(ctx, width, height)
    const featureData = useFeatureData(ctx, width, height)
    const quickUnion = useUnionFind(featureData, width)
    const threshold = 1000
    const areas = quickUnion.findAll(threshold)
    console.log('areas:', areas)
    const colorMap = useColorMap(areas)
    useColorfulArea(ctx, width, height, colorMap)

    const pointLists = Object.keys(areas).map(key => areas[key])
    console.log('pointLists' ,pointLists)
    const pointList = generatePoint2DByIndex(pointLists[1], width)
    
    const hull = convexHull(pointList)
    useDrawPath(ctx, hull)
}

export default {
  props: {
    src: String,
    width: Number,
    height: Number,
  },
  setup(props) {
    const { src, width, height } = props
    const canvas = ref(null)
    onMounted(async() => {
        const $canvas = canvas.value
        const ctx = useCanvas($canvas)
        drawImg(ctx, src, width, height)

        watch(() => props.src, (nv) => {
          drawImg(ctx, nv, width, height)
        })
    })
    return {
      canvas,
    }
  },
}
</script>