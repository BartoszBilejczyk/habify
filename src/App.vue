<template>
  <div class="p-safe">
    <div class="p-3"><router-view /></div>
    <Menu />
  </div>
</template>

<script setup lang="ts">
  import Menu from '@/components/Menu.vue';
</script>

<style></style>
