<template>
    <canvas ref="canvas" id="canvas" :width="width" :height="height"></canvas>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { 
    useCanvas,
    useDrawImage,
    useGrayScale,
} from '../utils/canvas'

async function drawGrayImg(ctx, src, width, height) {
    await useDrawImage(ctx, src)
    useGrayScale(ctx, width, height)
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
        drawGrayImg(ctx, src, width, height)
        
        watch(() => props.src, (nv) => {
          drawGrayImg(ctx, nv, width, height)
        })
    })
    return {
      canvas,
    }
  },
}
</script>