<script setup lang="ts">
definePageMeta({
  layout: 'docs',
});

useSeoMeta({
  title: 'Demo',
  ogTitle: 'Demo',
  description: 'Interactive demo of LazyYoutube and LazyVimeo components',
  ogDescription: 'Interactive demo of LazyYoutube and LazyVimeo components',
});
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        title="Demo"
        description="Interactive demonstration of LazyYoutube and LazyVimeo components"
      />

      <UPageBody>
        <VideoDemo />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
