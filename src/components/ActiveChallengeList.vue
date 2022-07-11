<template>
  <div class="">
    <ActiveChallenge v-for="challenge in challenges" :challenge="challenge">
      {{ challenge }}
    </ActiveChallenge>
  </div>
</template>

<script setup lang="ts">
  import ActiveChallenge from './ActiveChallenge.vue';
  import { ChallengeBasic } from '../types';

  defineProps<{
    challenges: ChallengeBasic[];
  }>();
</script>
