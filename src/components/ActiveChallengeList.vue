<template>
  <div class="">
    <ActiveChallenge v-for="challenge in challenges" :challenge="challenge" :user="userProfileBasic"></ActiveChallenge>
  </div>
</template>

<script setup lang="ts">
  import ActiveChallenge from './ActiveChallenge.vue';
  import { Challenge } from '../types';
  import { useFirebase } from '../useFirebase';

  const { userProfileBasic } = useFirebase();

  defineProps<{
    challenges: Challenge[];
  }>();
</script>
