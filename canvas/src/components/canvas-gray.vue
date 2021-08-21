<template>
    <canvas ref="canvas" id="canvas" width="400" height="400"></canvas>
</template>

<script>
import { ref, onMounted } from 'vue'
import { generatePoint2D } from '../convex-hull/Point2D.js'
import { convexHull } from '../convex-hull/index.js'
import { 
    useCanvas,
    useDrawPoint, 
    useDrawPath, 
    useDrawImage,
    useGrayScale,
    useBinaryImg,
    useSingleData,
    useColorfulArea,
} from '../utils/canvas'
import {
    useUnionFind,
} from '../utils/quick-union'

export default {
  setup() {
    const canvas = ref(null)
    onMounted(async() => {
        const $canvas = canvas.value
        const ctx = useCanvas($canvas)
        // await useDrawImage(ctx, 'src/assets/logo.png')

        const img = await useDrawImage(ctx, 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fres.book.ifeng.com%2Fattachments%2F2010%2F05%2F17%2Frd_rs_576e92aea26168e18a7802b0fbe58b4b.jpg&refer=http%3A%2F%2Fres.book.ifeng.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631895630&t=5d3e210cc462ba89ad35cd49ebc2cf5f')
        useGrayScale(ctx, img.width, img.height)
        // useBinaryImg(ctx, img.width, img.height)
        // const singleData = useSingleData(ctx, img.width, img.height)
        // const quickUnion = useUnionFind(singleData, img.width)
        // useColorfulArea(ctx, img.width, img.height, quickUnion)

    //   const pointList = generatePoint2D(10)
    //   pointList.forEach(p => useDrawPoint(ctx, p))
    //   const hull = convexHull(pointList)
    //   useDrawPath(ctx, hull)
    })
    return {
      canvas,
    }
  },
}
</script>