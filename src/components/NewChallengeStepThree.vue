<template>
  <div class="">
    <BaseSection :title="$t('titles.challengeExistingFriends')">
      <div
        v-for="friend in friends"
        :key="friend.id"
        class="bg-white-10 dark:bg-dark-800 my-3 py-1 px-3 rounded-lg cursor-pointer"
        :class="stepTwo.inviteeId === friend.id && 'bg-white-20 dark:bg-white-20 dark:text-white-500'"
        @click="handleChooseFriend(friend)"
      >
        {{ friend.name }}
      </div>
    </BaseSection>
    <div class="text-center text-xs text-white-200 dark:text-white-30 mb-8">{{ $t('challenge.chooseAfter') }}</div>
  </div>
</template>

<script setup lang="ts">
  import BaseSection from './BaseSection.vue';
  import BaseButton from './BaseButton.vue';
  import { useStore } from '../composables/useStore';
  import { UserBasic } from '../types';

  const { stepTwo } = useStore();

  const handleChooseFriend = (friend: UserBasic) => {
    stepTwo.value = { invitee: friend, inviteeId: friend.id };
  };

  defineProps<{
    friends: any[];
  }>();
</script>
