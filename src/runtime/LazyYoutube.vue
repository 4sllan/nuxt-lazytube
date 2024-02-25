<template>
  <VideoWrapper
      :aspectRatioValue="aspectRatioValue"
      :maxWidth="maxWidth"
      @VnodeMounted="initLib"
  >
    <Preview
        :isVideoFound="isVideoFound"
        :fetchingInfo="fetchingInfo"
        :defaultThumbnailQuality="thumbnailQuality"
        :customThumbnail="customThumbnail"
        :videoTitle="getTitle"
        :videoID="videoID"
        :showTitle="showTitle"

        :clicked="clicked"
        :onceLoaded="onceLoaded"
        @click="handleClick"
    >
      <template v-slot:button>
        <slot name="button"/>
      </template>

      <template v-slot:loader>
        <slot name="loader"/>
      </template>

    </Preview>
  </VideoWrapper>
</template>

<script setup>
import {ref, onMounted, watch } from 'vue'
// Importing Components
import VideoWrapper from './common/Wrapper.vue'
import Preview from './common/Preview.vue'
import {calcAspect, createIframe, fetchingOembed, getYouTubeID, isPostMessageSupported} from "./utils";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  aspectRatio: {
    type: String,
    default: '16:9',
    validator: function (value) {
      return /^\d+:\d+$/u.test(value)
    },
    required: false
  },
  showTitle: {
    type: Boolean,
    default: true,
    required: false
  },
  maxWidth: {
    type: String,
    default: '560px',
    required: false
  },
  autoplay: {
    type: Boolean,
    default: false,
    required: false
  },
  thumbnailQuality: {
    type: String,
    default: 'standard',
    required: false
  },
  iframeClass: {
    type: String,
    default: 'ly-iframe',
    required: false
  },
  customTitle: {
    type: String,
    default: '',
    required: false
  },
  customThumbnail: {
    type: String,
    default: '',
    required: false
  },
  oembedFetch: {
    type: Boolean,
    default: true,
    required: false
  },
})

const clicked = ref(false)
const onceLoaded = ref(false)
const iframeEl = ref(null)
const videoInfo = ref(null)
const fetchingInfo = ref(true)
const isVideoFound = ref(false)
const VNodes = ref()

const videoID = computed(() => {
  return getYouTubeID(props.src)
})
const aspectRatioValue = computed(() => {
  return calcAspect(props.aspectRatio)
})
const getTitle = computed(() => {
  if (props.customTitle) {
    return props.customTitle
  }
  return videoInfo.value !== null ? videoInfo.value.title : props.customTitle
})

const initLib = ({el, ctx}) => {
  VNodes.value = ctx.vnode.el;
}
const resetView = () => {
  if (iframeEl.value !== null) {
    // Removing form dom
    iframeEl.value.remove()

    // Resetting the states
    iframeEl.value = null
    clicked.value = false
    onceLoaded.value = false
  }
}
const initiateIframe = (autoplay = false, type = 'youtube') => {

  iframeEl.value = createIframe(videoID.value, getTitle.value, props.iframeClass, type)

  iframeEl.value.addEventListener('load', () => {
    if (fetchingInfo.value === false) {
      if (!onceLoaded.value) {
        onceLoaded.value = true
      }
    }

    if (autoplay) {
      if (type === 'youtube') {
        iframeEl.value.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*')
      } else {
        iframeEl.value.contentWindow.postMessage('{"method":"play"}', '*');
      }
    }
  })

  VNodes.value.appendChild(iframeEl.value)

  iframeEl.value.focus()
}
const handleClick = () => {
  clicked.value = true
  if (fetchingInfo.value === false && !onceLoaded.value && isVideoFound.value) {
    if (clicked.value && iframeEl.value === null) {
      initiateIframe()
    }

  }
}
const pauseVideo = () => {
  if (!isPostMessageSupported) {
    return
  }

  if (iframeEl.value !== null) {
    iframeEl.value.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*')
  }
}
const playVideo = () => {
  if (!isPostMessageSupported) {
    return
  }

  if (iframeEl.value === null) {
    initiateIframe(props.autoplay)
  } else {
    iframeEl.value.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*')
  }
}
const stopVideo = () => {
  if (!isPostMessageSupported) {
    return
  }

  if (iframeEl.value !== null) {
    iframeEl.value.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*')
  }
}
const getFetchingOembed = () => {
  if (props.oembedFetch) {

    // Fetch Oembed
    fetchingOembed(props.src)
        .then(function (response) {
          return response.json()
        })
        .then(response => {
          videoInfo.value = response
          isVideoFound.value = true
        })
        .catch(() => {
          // handle error
          videoInfo.value = null
          isVideoFound.value = false
        })
        .finally(() => {
          // always executed
          fetchingInfo.value = false

          if (props.autoplay) {
            playVideo()
          }
        })
  } else {
    isVideoFound.value = true
    fetchingInfo.value = false
  }
}
const resetState = () => {
  resetView()
  clicked.value = false
  onceLoaded.value = false
  iframeEl.value = null
  videoInfo.value = null
  fetchingInfo.value = true
  isVideoFound.value = false
}


onMounted(() => {
  getFetchingOembed()
})

watch(props.src, async (val, oldVal) => {
  if (val !== oldVal) {
    resetState();
    getFetchingOembed()
  }
})

defineExpose({
  pauseVideo,
  playVideo,
  stopVideo,
  resetView
})
</script>
