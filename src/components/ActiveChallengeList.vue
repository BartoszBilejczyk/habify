<template>
  <div class="">
    <ActiveChallenge v-for="i in 3" />
  </div>
</template>

<script setup lang="ts">
  import ActiveChallenge from './ActiveChallenge.vue';
</script>
