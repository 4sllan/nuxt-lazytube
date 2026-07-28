<script setup>
import { payload } from 'pix-payload';

const data = {
  key: '1a62a649-be23-4679-8ea9-5563d40943a8',
  name: 'Aslan Kelvin',
  city: 'SAO PAULO',
};

const pixKey = payload(data);

const qr = useQrcode(pixKey, {
  toBase64: true,
});
</script>

<template>
  <div class="flex justify-center my-4">
    <NuxtImg :src="qr" alt="pix qr code" width="200" height="200" />
  </div>
</template>
