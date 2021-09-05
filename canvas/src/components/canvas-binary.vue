<template>
    <canvas ref="canvas" id="canvas" :width="width" :height="height"></canvas>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { 
    useCanvas,
    useDrawImage,
    useBinaryImg,
    useClearCanvas,
} from '../utils/canvas'

async function drawBinaryImg(ctx, src, width, height) {
  await useDrawImage(ctx, src)
  useBinaryImg(ctx, width, height)
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

        drawBinaryImg(ctx, src, width, height)

        watch(() => props.src, (nv) => {
          drawBinaryImg(ctx, nv, width, height)
        })
    })
    return {
      canvas,
    }
  },
}
</script>