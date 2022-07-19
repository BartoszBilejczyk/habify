<template>
  <div class="">
    <BaseLabel v-if="!activeNotificationsLength" color="primary" class="mb-6 flex justify-center w-fit mx-auto">
      {{ $t('notifications.noUnread') }}
    </BaseLabel>
    <Notification
      v-for="notification in [...visibleNotifications].reverse()"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script setup lang="ts">
  import BaseLabel from '../components/BaseLabel.vue';
  import { useUser } from '../composables/useUser';

  const { visibleNotifications, activeNotificationsLength } = useUser();

  import Notification from './Notification.vue';
</script>
