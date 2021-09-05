<template>
  <div>
    <el-radio-group v-model="src">
      <el-radio v-for="(v, i) in SrcOptions" :key="i" :label="v.value">
        {{v.label}}
      </el-radio>
    </el-radio-group>
    <el-tabs v-model="activeName">
      <el-tab-pane label="凸包" name="1">
        <ConvesHull />
      </el-tab-pane>
      <el-tab-pane label="原图" name="2">
        <img :src="src" :width="width" :height="height" />
      </el-tab-pane>
      <el-tab-pane label="灰度图" name="3">
        <CanvasGray :src="src" :width="width" :height="height" />
      </el-tab-pane>
      <el-tab-pane label="二值图" name="4">
        <CanvasBinary :src="src" :width="width" :height="height" />
      </el-tab-pane>
      <el-tab-pane label="多值图" name="5">
        <CanvasMutil :src="src" :width="width" :height="height" />
      </el-tab-pane>
      <el-tab-pane label="基于多值图抠图" name="6">
        <Canvas :src="src" :width="width" :height="height" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import ConvesHull from './components/conves-hull.vue'
import CanvasGray from './components/canvas-gray.vue'
import CanvasBinary from './components/canvas-binary.vue'
import CanvasMutil from './components/canvas-mutil.vue'
import Canvas from './components/canvas.vue'
import LogoSrc from './assets/logo.png'
import GoogleSrc from './assets/google.jpeg'
import LenaSrc from './assets/lena.jpeg'

const width = 400
const height = 400
const activeName = '1'
const SrcOptions = [
  {
    value: LogoSrc,
    label: './assets/logo.png',
  },
  {
    value: GoogleSrc,
    label: './assets/google.jpeg',
  },
  {
    value: LenaSrc,
    label: './assets/lena.jpeg',
  },
]
const { src } = toRefs(reactive({ src: GoogleSrc }))
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
canvas { border: 1px solid black; }
</style>
