<template>
  <div class="bg-white-20 p-safe max-h-fit min-h-screen w-screen app">
    <div class="h-full"><router-view /></div>
    <Menu />
  </div>
</template>

<script setup lang="ts">
  import Menu from './components/Menu.vue';
</script>
