<div align="center">
<img src=".github/six-dropzone.svg" width="400">
<p align="center">6 Dropzone support for Nuxt 3</p>
</div>


<br>

Embed a YouTube or Vimeo player easily and lazy load the video to save resources and reduces initial load size.
Useful when performance and page size is important or for sites with many embedded videos.

For a simple example page with 10 videos, vue-lazytube will reduce loadtime by 7x and memory usage by 2-3x.

[![Static Badge](https://img.shields.io/badge/NPM:nuxt-lazytube?style=flat-square&colorA=18181B&colorB=28CF8D)](https://www.npmjs.com/package/nuxt-lazytube)
[![Static Badge](https://img.shields.io/badge/GITHUB:nuxt-lazytube?style=flat-square&colorA=18181B&colorB=28CF8D)](https://github.com/4sllan/nuxt-lazytube)
[![npm version](https://img.shields.io/npm/v/nuxt-lazytube/latest.svg?style=flat-square&colorA=18181B&colorB=28CF8D)](https://www.npmjs.com/package/nuxt-lazytube)
![GitHub License][license]
[![npm downloads](https://img.shields.io/npm/dt/nuxt-lazytube.svg?style=flat-square&colorA=18181B&colorB=28CF8D)](https://www.npmjs.com/package/nuxt-lazytube)
[![Nuxt][nuxt-src]][nuxt-href]
[![Static Badge](https://img.shields.io/badge/-%E2%99%A5%20Sponsors-ec5cc6?style=flat-square)](https://github.com/sponsors/4sllan)

[Demo online](https://codesandbox.io/s/vue-lazytube-forked-17o8v?file=/src/App.vue) | [Tutorial](https://medium.com/geekculture/light-and-responsive-youtube-embeds-faster-vue-web-page-load-speeds-c8e477b93f0f)


---

#### Table of Content

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
    * [Install Globally](#to-make-the-plugin-available-globally)
    * [Install Locally](#to-include-only-in-specific-components)
- [Usage](#usage)
- [API](#api)
    * [Props](#props)
    * [Slots](#slots)
    * [Methods](#methods)
    * [Example](#example)
- [License](#open-source-license)
- [Buy Me a Coffee](#buy-me-a-coffee)

## Features

- reduces initial load size by ~1.1 MB per video
- fully responsive and customizable through `props`
- provides methods to control (`play`, `stop`, `pause` and `reset`) embedded videos
- provide options to set up custom title and preview of embedded videos
- platform supported: Youtube and Vimeo

## Demo

[![view vue-lazytube](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-lazytube-forked-17o8v?file=/src/App.vue)

## Setup

## Installation

> nuxt-lazytube for Nuxt3 applications.

```sh
$ npm install --save nuxt-lazytube
```

```sh
$ yarn add nuxt-lazytube
```

### Config

***nuxt.config.js***

``` js
{
     modules: [
        'nuxt-lazytube',
    ]
},

```

## Usage

```javascript
<template>
    <!-- Youtube Embed -->
    <LazyYoutube src="https://www.youtube.com/watch?v=TcMBFSGVi1c"/>

    <!-- Vimeo Embed -->
    <LazyVimeo src="https://player.vimeo.com/video/64654583"/>
</template>
```

## API

### Props

| Name               | Type      | Default Value | Description                                                                                                                                                                              | Required |
|--------------------|-----------|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `src`              | `String`  | ``            | To load video and iframe, should be Youtube/Vimeo video link.                                                                                                                            | `true`   |
| `aspectRatio`      | `String`  | `16:9`        | Maintaining the aspect ratio of video, perfect for responsively handling video embeds based on the width of the parent, should be in `*:*` format. e.g, `1:1`, `4:3`, `16:9` and `21:9`. | `false`  |
| `maxWidth`         | `String`  | `560px`       | Defines maximum width of video container.                                                                                                                                                | `false`  |
| `showTitle`        | `Boolean` | `true`        | Defines whether to show video title on top.                                                                                                                                              | `false`  |
| `autoplay`         | `Boolean` | `false`       | Defines whether to load the iframe as the page loads _(not recommended)_                                                                                                                 | `false`  |
| `thumbnailQuality` | `String`  | `standard`    | Defines the quality of thumbnail, should be one of the following `default`, `medium`, `high`, `standard` or `maxres`                                                                     | `false`  |
| `iframeClass`      | `String`  | `ly-iframe`   | Defines the class on iframe element                                                                                                                                                      | `false`  |
| `customTitle`      | `String`  | ``            | Defines the custom title of the video                                                                                                                                                    | `false`  |
| `customThumbnail`  | `String`  | ``            | Defines the custom thumbnail image link of the video                                                                                                                                     | `false`  |

### Slots

This Component provides some slots. You can use the named slot to render custom play button and loader:

| Slot   | Description                                         |
|--------|-----------------------------------------------------|
| button | Slot gives an ability to provide custom play button |
| loader | Slot gives an ability to provide custom loader      |

### Methods

These methods let you control the player using JavaScript, so you can perform the operations
like `play`, `stop`, `pause` and `reset`.

> The user's browser must support the HTML5 postMessage feature. Most modern browsers support postMessage.

| Name       | Type       | Usage                                     |
|------------|------------|-------------------------------------------| 
| playVideo  | `function` | `this.$refs["lazyVideo"]['playVideo']()`  |
| stopVideo  | `function` | `this.$refs["lazyVideo"]['stopVideo']()`  |
| pauseVideo | `function` | `this.$refs["lazyVideo"]['pauseVideo']()` |
| resetView  | `function` | `this.$refs["lazyVideo"]['resetView']()`  |

_Note: Must Replace `lazyVideo` with your [ref](https://v3.vuejs.org/guide/component-template-refs.html)._

### Example

```html
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
```

## ⚖️ License

Released under [MIT](/LICENSE) by [@4slan](https://github.com/4sllan).


[license]: https://img.shields.io/github/license/4sllan/nuxt-lazytube?style=flat-square&colorA=18181B&colorB=28CF8D

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js

[nuxt-href]: https://nuxt.com

