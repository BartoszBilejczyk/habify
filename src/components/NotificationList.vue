<template>
  <div class="">
    <Notification v-for="i in 3" />
  </div>
</template>

<script setup lang="ts">
  import Notification from './Notification.vue';
</script>
