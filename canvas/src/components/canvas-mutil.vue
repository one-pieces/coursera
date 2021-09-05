<template>
    <canvas ref="canvas" id="canvas" :width="width" :height="height"></canvas>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { 
    useCanvas,
    useDrawImage,
    useMultiLevelImg,
} from '../utils/canvas'

async function drawMutilImg(ctx, src, width, height) {
    await useDrawImage(ctx, src)
    useMultiLevelImg(ctx, width, height)
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

        drawMutilImg(ctx, src, width, height)

        watch(() => props.src, (nv) => {
          drawMutilImg(ctx, nv, width, height)
        })
    })
    return {
      canvas,
    }
  },
}
</script>