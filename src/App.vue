<template>
  <div class="p-safe max-h-fit h-screen w-screen">
    <div class="h-full"><router-view /></div>
    <Menu />
  </div>
</template>

<script setup lang="ts">
  import Menu from '@/components/Menu.vue';
</script>

<style></style>
