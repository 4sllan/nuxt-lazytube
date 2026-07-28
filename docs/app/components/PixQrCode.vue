<script setup>
import QrcodeVue from 'qrcode.vue';
import { payload } from 'pix-payload';

const data = {
  key: '1a62a649-be23-4679-8ea9-5563d40943a8',
  name: 'Aslan Kelvin',
  city: 'SAO PAULO',
};
const pixKey = payload(data);
</script>

<template>
  <div class="flex justify-center my-4">
    <QrcodeVue :value="pixKey" :size="200" level="H" />
  </div>
</template>
