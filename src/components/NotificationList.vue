<template>
  <div class="">
    <Notification
      v-for="notification in [...activeNotifications].reverse()"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script setup lang="ts">
  import { useUser } from '../composables/useUser';

  const { activeNotifications } = useUser();

  import Notification from './Notification.vue';
</script>
