<template>
  <div class="">
    <Notification v-for="notification in [...userProfile.notifications].reverse()" :notification="notification" />
  </div>
</template>

<script setup lang="ts">
  import { useUser } from '../composables/useUser';

  const { userProfile } = useUser();

  import Notification from './Notification.vue';
</script>
