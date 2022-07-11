<template>
  <div class="">
    <ActiveChallenge v-for="challenge in challenges" :challenge="challenge"></ActiveChallenge>
  </div>
</template>

<script setup lang="ts">
  import ActiveChallenge from './ActiveChallenge.vue';
  import { Challenge } from '../types';

  defineProps<{
    challenges: Challenge[];
  }>();
</script>
