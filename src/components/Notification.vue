<template>
  <BaseBox
    class="mt-1 mb-4"
    :class="{ 'border border-solid border-primary': notification.status === NOTIFICATION_STATUS.active }"
  >
    <div class="mb-5 relative">
      <div class="text-sm w-8/12">{{ notification.name }}</div>
      <div class="mt-3 text-xs w-9/12">{{ notification.description }}</div>
      <div class="flex flex-col items-end">
        <BaseLabel class="absolute right-6 top-0" color="white">
          {{ NOTIFICATION_CATEGORY[notification.category]?.label }}
        </BaseLabel>
        <DeleteIcon
          class="w-5 h-5 absolute -right-1.5 top-0 text-white-100 dark:text-white rounded-full"
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
        :xsmall="index === 0"
        :primary="index === 0"
        :text-secondary="index > 0"
        @click="handleNotificationAction(action)"
      >
        {{ $t(`notifications.actions.${action}`) }}
      </BaseButton>
    </div>
  </BaseBox>
</template>

<script setup lang="ts">
  import { Notification, NotificationAction } from '../types';
  import BaseBox from './BaseBox.vue';
  import BaseButton from './BaseButton.vue';
  import BaseLabel from './BaseLabel.vue';
  import { NOTIFICATION_CATEGORY, NOTIFICATION_ACTION, NOTIFICATION_STATUS } from '../helpers/constants';
  import { useRouter } from 'vue-router';
  import DeleteIcon from '../assets/icons/delete.svg?component';
  import { useUser } from '../composables/useUser';

  const { markNotificationAsDimissed } = useUser();
  const { push, currentRoute } = useRouter();

  const props = defineProps<{
    notification: Notification;
  }>();

  const handleNotificationAction = async (action: NotificationAction) => {
    switch (action) {
      // case NOTIFICATION_ACTION.acceptChallenge.value:
      //   await push({ name: 'challenge', params: { id: props.notification.challengeId } });

      // case NOTIFICATION_ACTION.refuseChallenge.value:
      // TODO

      case NOTIFICATION_ACTION.showInvite.value:
        await push({
          name: 'invite',
          query: { ...currentRoute.value.query, inviteCode: props.notification.challengeId },
        });
        break;
      case NOTIFICATION_ACTION.createNewChallenge.value:
        await push({ name: 'new-challenge' });
        break;
      case NOTIFICATION_ACTION.goToChallenge.value:
        await push({ name: 'challenge', params: { ...currentRoute.value.query, id: props.notification.challengeId } });
        break;
    }
  };

  const dismissNotification = async () => {
    await markNotificationAsDimissed(props.notification.id);
  };
</script>
