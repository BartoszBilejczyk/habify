<template>
  <div class="">
    <BaseSection :title="$t('titles.challengeExistingFriends')">
      <!--  TODO add icon that friend has been selected-->
      <div
        v-for="friend in friends"
        :key="friend.id"
        class="bg-white-10 dark:bg-dark-800 my-3 py-1 px-3 rounded-lg cursor-pointer"
        :class="stepOne.inviteeId === friend.id && 'bg-primary-20 dark:bg-white-10 dark:text-white-500'"
        @click="handleChooseFriend(friend)"
      >
        {{ friend.name }} {{ friend.nickname && `(${friend.nickname})` }}
      </div>
    </BaseSection>
    <div class="text-center text-xs text-white-200 dark:text-white-30 mb-8">{{ $t('challenge.chooseAfter') }}</div>
  </div>
</template>

<script setup lang="ts">
  import BaseSection from './BaseSection.vue';
  import { useStore } from '../composables/useStore';
  import { UserBasic } from '../types';
  import { emptyUserBasic } from '../helpers/empty';

  const { stepOne } = useStore();

  const handleChooseFriend = (friend: UserBasic) => {
    stepOne.invitee = {
      ...emptyUserBasic,
      ...friend,
    };
    stepOne.inviteeId = friend.id;
  };

  defineProps<{
    friends: any[];
  }>();
</script>
