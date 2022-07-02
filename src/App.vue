<template>
  <div class="p-safe max-h-fit h-screen w-screen app">
    <div class="h-full"><router-view /></div>
    <Menu />
  </div>
</template>

<script setup lang="ts">
  import Menu from './components/Menu.vue';
</script>

<style>
  .app {
    padding: env(safe-inset-area-top) env(safe-inset-area-right) env(safe-inset-area-bottom) env(safe-inset-area-left) !important;
  }
</style>
