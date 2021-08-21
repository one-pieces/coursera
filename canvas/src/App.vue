<template>
  <div>
      <!-- <ConvesHull /> -->
      <Canvas />
      <CanvasGray />
  </div>
</template>

<script setup>
import ConvesHull from './components/conves-hull.vue'
import CanvasGray from './components/canvas-gray.vue'
import Canvas from './components/canvas.vue'
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
