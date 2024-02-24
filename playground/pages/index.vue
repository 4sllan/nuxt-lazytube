<script setup>
import LazyYoutube from '../../src/runtime/LazyYoutube.vue'
import LazyVimeo from "../../src/runtime/LazyVimeo.vue"

const youtubeLazyVideo = ref()

const youtubeLink = ref('https://www.youtube.com/embed/_THZZFN4SYc')
const vimeoLink = ref('https://player.vimeo.com/video/125683400')


const handleClick = (event, ref) => {
  youtubeLazyVideo[event]()
}
const handleSearch = (e, platform) => {
  if (platform === 'youtube')
    this.youtubeLink = e.target.value;
  else
    this.vimeoLink = e.target.value;
}
</script>

<template>
  <div id="app">

    <h2>Vimeo Lazy Video</h2>
    <input class="input" type="text" @keydown.enter="handleSearch($event, 'vimeo')" placeholder="Vimeo Video Link"
           :value="vimeoLink">

    <LazyVimeo ref="vimeoLazyVideo"
               :src="vimeoLink"
               max-width="720px"
               aspect-ratio="16:9"
               thumbnail-quality="standard">

      <template v-slot:button>
        <!--        <button>Play</button>-->
      </template>

      <template v-slot:loader>
        <button>Loading</button>
      </template>
    </LazyVimeo>


    <div class="buttons">
      <button @click="handleClick('playVideo', 'vimeoLazyVideo')">Play</button>
      <button @click="handleClick('stopVideo', 'vimeoLazyVideo')">Stop</button>
      <button @click="handleClick('pauseVideo', 'vimeoLazyVideo')">Pause</button>
      <button @click="handleClick('resetView', 'vimeoLazyVideo')">Reset</button>
    </div>

    <h2>Youtube Lazy Video</h2>

    <input class="input" type="text" @keydown.enter="handleSearch($event, 'youtube')"
           placeholder="Youtube Video Link or Video Id" :value="youtubeLink">

    <LazyYoutube
        ref="youtubeLazyVideo"
        :src="youtubeLink"
        max-width="720px"
        aspect-ratio="16:9"
        thumbnail-quality="standard"
    />

    <div class="buttons">
      <button @click="handleClick('playVideo')">Play</button>
      <button @click="handleClick('stopVideo')">Stop</button>
      <button @click="handleClick('pauseVideo')">Pause</button>
      <button @click="handleClick('resetView')">Reset</button>
    </div>


  </div>
</template>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

h2 {
  margin-bottom: 0;
  margin-top: 2rem;
}

.input {
  padding: 5px;
  max-width: 720px;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 90%;
}

.buttons {
  margin-top: 25px;
}
</style>
