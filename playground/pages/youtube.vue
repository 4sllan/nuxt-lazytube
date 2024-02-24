<script setup>
const lazyVideo = ref()

const handleClick = (event) => {
  lazyVideo.value[event]()
}
</script>

<template>
  <div>
    <LazyYoutube
        ref="lazyVideo"
        src="https://www.youtube.com/embed/KfYkzXTut1Y"
    />

    <button @click="handleClick('playVideo')">Play</button>
    <button @click="handleClick('stopVideo')"> Stop</button>
    <button @click="handleClick('pauseVideo')"> Pause</button>
    <button @click="handleClick('resetView')"> Reset</button>
  </div>
</template>

