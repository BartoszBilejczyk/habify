<template>
  <div class="">
    <HowItWorksItem v-for="i in 3" />
  </div>
</template>

<script setup lang="ts">
  import HowItWorksItem from './HowItWorksItem.vue';
</script>
