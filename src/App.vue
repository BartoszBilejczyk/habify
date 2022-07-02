<template>
  <div class="px-6 max-h-fit h-screen w-screen app">
    <div class="h-full"><router-view /></div>
    <Menu />
  </div>
</template>

<script setup lang="ts">
  import Menu from './components/Menu.vue';
</script>
