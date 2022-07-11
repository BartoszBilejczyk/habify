<template>
  <div class="px-4 py-3 bg-white-10 dark:bg-white-500 rounded-xl text-white-900 dark:text-white">
    <div>{{ challenge.title }}</div>
    <div>{{ challenge.points }}</div>
    <div>{{ challenge.status }}</div>
    <div>{{ challenge.invitee?.name }}</div>
    <div>{{ challenge.inviteLink }}</div>
  </div>
</template>

<script setup lang="ts">
  import { Challenge } from '../types';

  defineProps<{
    challenge: Challenge;
  }>();
</script>
