<template>
  <div class="">
    <BaseBox class="mt-1 mb-4">
      <div class="mb-5 relative">
        <div class="text-sm w-8/12">{{ notification.name }}</div>
        <div class="mt-3 text-xs w-9/12">{{ notification.description }}</div>
        <div class="flex flex-col items-end">
          <BaseLabel class="absolute right-6 top-0" color="white">
            {{ NOTIFICATION_CATEGORY[notification.category]?.label }}
          </BaseLabel>
          <DeleteIcon
            class="w-5 h-5 absolute -right-1.5 top-0 text-white-700 text-white rounded-full"
            @click="dismissNotification"
          >
            {{ NOTIFICATION_CATEGORY[notification.category]?.label }}
          </DeleteIcon>
        </div>
      </div>
      <div class="flex justify-end" v-if="notification.actions">
        <!--        TODO translations-->
        <BaseButton
          v-for="(action, index) in notification.actions"
          :class="{ 'mr-3': index }"
          :small="index === 0"
          :primary="index === 0"
          :text-secondary="index > 0"
          @click="handleNotificationAction(action)"
        >
          {{ action }}
        </BaseButton>
      </div>
    </BaseBox>
  </div>
</template>

<script setup lang="ts">
  import { Notification, NotificationAction } from '../types';
  import BaseBox from './BaseBox.vue';
  import BaseButton from './BaseButton.vue';
  import BaseLabel from './BaseLabel.vue';
  import { NOTIFICATION_CATEGORY, NOTIFICATION_ACTION } from '../helpers/constants';
  import { useRouter } from 'vue-router';
  const { push } = useRouter();
  import DeleteIcon from '../assets/icons/delete.svg?component';
  import { onMounted } from 'vue';
  import { useUser } from '../composables/useUser';

  const { markNotificationAsDimissed } = useUser();

  const props = defineProps<{
    notification: Notification;
  }>();

  onMounted(() => {
    // if in viewport mark as seen
  });

  const handleNotificationAction = async (action: NotificationAction) => {
    switch (action) {
      case NOTIFICATION_ACTION.goToChallenge:
        push({ name: 'challenge', params: { id: props.notification.challengeId } });
    }
  };

  const dismissNotification = async () => {
    await markNotificationAsDimissed(props.notification.id);
  };
</script>
