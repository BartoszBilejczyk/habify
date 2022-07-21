<template>
  <div
    class="bg-white-10 dark:bg-dark-800 text-white-700 dark:text-white-20 rounded-lg"
    :class="{ 'mb-2 p-1.5': small, 'mb-4 p-3': !small }"
  >
    <div class="flex items-center justify-between flex-nowrap">
      <div class="flex items-center">
        <div
          v-if="friend.name"
          class="rounded-full bg-white-20 dark:bg-white-400 flex items-center justify-center font-bold"
          :class="{ 'h-8 w-8 text-sm': small, 'h-10 w-10': !small }"
        >
          {{ getInitials(friend.name) }}
        </div>
        <div v-else class="h-10 w-10 rounded-full bg-white-20 dark:bg-white-400 flex items-center justify-center">
          <ChevronRight class="w-4 h-4 text-white" />
        </div>
        <div class="ml-2">{{ friend.name }} {{ friend.nickname && `(${friend.nickname})` }}</div>
      </div>
      <BaseButton outline :small="!small" :xsmall="small" @click="handleStartNewChallenge(friend)">
        {{ $t('common.challenge') }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from '../components/BaseButton.vue';
  import { useUser } from '../composables/useUser';
  import { useRouter } from 'vue-router';
  import ChevronRight from '../assets/icons/chevron-right.svg?component';
  import { ref } from 'vue';
  import { useStore } from '../composables/useStore';
  import { emptyUserBasic } from '../helpers/empty';
  import { Friend } from '../types';

  const { stepOne } = useStore();
  const { userProfile } = useUser();
  const { push } = useRouter();

  defineProps<{
    friend: Friend;
    small: boolean;
  }>();

  const loading = ref(false);

  const getInitials = (name: string) => {
    const splitted: string[] = name.split(' ');
    // @ts-ignore
    return splitted.shift().charAt(0) + splitted.pop().charAt(0);
  };

  const handleStartNewChallenge = async (friend: { id: string; name: string }) => {
    stepOne.invitee = {
      ...emptyUserBasic,
      ...friend,
    };
    stepOne.inviteeId = friend.id;

    await push({ name: 'new-challenge' });
  };
</script>
