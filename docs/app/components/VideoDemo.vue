<script setup lang="ts">
const youtubeLazyVideo = ref();
const vimeoLazyVideo = ref();

const youtubeLink = ref(
  '//www.youtube.com/embed/7jGj8z5QysQ?rel=0&list=PLg65fUbBz9kLJjWCVtveJrrqkmckKmSeA'
);
const vimeoLink = ref('https://player.vimeo.com/video/1083487635');

const handleClickTube = (event: string) => {
  youtubeLazyVideo.value[event]();
};
const handleClickVimeo = (event: string) => {
  vimeoLazyVideo.value[event]();
};
const handleSearch = (e: Event, platform: 'youtube' | 'vimeo') => {
  const target = e.target as HTMLInputElement;
  if (platform === 'youtube') {
    youtubeLink.value = target.value;
  } else {
    vimeoLink.value = target.value;
  }
};
</script>

<template>
  <div id="app">
    <h2>Vimeo Lazy Video</h2>
    <input
      class="input"
      type="text"
      @keydown.enter="handleSearch($event, 'vimeo')"
      placeholder="Vimeo Video Link"
      :value="vimeoLink"
      aria-label="Vimeo video URL input"
    />

    <LazyVimeo
      ref="vimeoLazyVideo"
      :src="vimeoLink"
      max-width="720px"
      aspect-ratio="16:9"
      thumbnail-quality="standard"
    >
      <template #button>
        <!-- Custom button slot -->
      </template>

      <template #loader>
        <button>Loading</button>
      </template>
    </LazyVimeo>

    <div class="buttons">
      <button @click="handleClickVimeo('playVideo')">Play</button>
      <button @click="handleClickVimeo('stopVideo')">Stop</button>
      <button @click="handleClickVimeo('pauseVideo')">Pause</button>
      <button @click="handleClickVimeo('resetView')">Reset</button>
    </div>

    <h2>Youtube Lazy Video</h2>

    <input
      class="input"
      type="text"
      @keydown.enter="handleSearch($event, 'youtube')"
      placeholder="Youtube Video Link or Video Id"
      :value="youtubeLink"
      aria-label="YouTube video URL input"
    />

    <LazyYoutube
      ref="youtubeLazyVideo"
      :src="youtubeLink"
      max-width="720px"
      aspect-ratio="16:9"
      thumbnail-quality="standard"
      iframe-policy="credentialless"
    />

    <div class="buttons">
      <button @click="handleClickTube('playVideo')">Play</button>
      <button @click="handleClickTube('stopVideo')">Stop</button>
      <button @click="handleClickTube('pauseVideo')">Pause</button>
      <button @click="handleClickTube('resetView')">Reset</button>
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
  padding: 1rem;
}

h2 {
  margin-bottom: 0.5rem;
  margin-top: 2rem;
  text-align: center;
}

.input {
  padding: 0.75rem 1rem;
  max-width: 720px;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  width: 90%;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.buttons {
  margin-top: 1.5rem;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.buttons button {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #3b82f6;
  color: white;
}

.buttons button:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.buttons button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
}
</style>
