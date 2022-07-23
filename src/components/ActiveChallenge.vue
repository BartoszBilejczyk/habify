<template>
  <BaseBox @click="goToChallengeDetails" class="mt-1 mb-4">
    <div class="flex flex-nowrap justify-between mb-5">
      <div>{{ challenge.title }}</div>
      <div class="flex flex-col items-end">
        <!-- TODO capitalize-->
        <BaseLabel :color="statusColor">{{ CHALLENGE_STATUS[challenge.status]?.label }}</BaseLabel>
        <BaseLabel class="my-2" color="white">{{ challenge.points }} Points</BaseLabel>
      </div>
    </div>
    <div class="flex items-center text-xs">
      <div
        v-if="personName"
        class="h-6 w-6 rounded-full bg-white-20 dark:bg-white-400 flex items-center justify-center font-bold"
      >
        {{ getInitials(personName) }}
      </div>
      <div class="ml-1.5">{{ personName }}</div>
    </div>
    <!--    <div>{{ challenge.inviteLink }}</div>-->
    <ChevronRight class="absolute w-4 h-4 text-white-100 dark:text-white right-3 bottom-3" />
  </BaseBox>
</template>

<script setup lang="ts">
  import ChevronRight from '../assets/icons/chevron-right.svg?component';
  import { useRouter } from 'vue-router';
  import BaseLabel from './BaseLabel.vue';
  import BaseBox from './BaseBox.vue';
  import { CHALLENGE_STATUS } from '../helpers/constants';

  import { Challenge, UserBasic } from '../types';
  import { computed } from 'vue';

  const props = defineProps<{
    challenge: Challenge;
    user: UserBasic;
  }>();

  const { push } = useRouter();

  const goToChallengeDetails = async () => {
    await push({ name: 'challenge', params: { id: props.challenge.id } });
  };

  const statusColor = computed(() => {
    if (props.challenge.status === CHALLENGE_STATUS.waitsForConfirm.value) {
      return 'coral';
    }
    if (props.challenge.status === CHALLENGE_STATUS.done.value) {
      return 'green';
    }
    if (props.challenge.status === CHALLENGE_STATUS.pending.value) {
      return 'yellow';
    }
    if (props.challenge.status === CHALLENGE_STATUS.active.value) {
      return 'primary';
    }
    if (props.challenge.status === CHALLENGE_STATUS.closed.value) {
      return 'red';
    }

    return 'primary';
  });

  const personName = computed(() => {
    return props.user.id === props.challenge.inviterId ? props.challenge.invitee?.name : props.challenge.inviter?.name;
  });

  const getInitials = (name: string) => {
    if (name) {
      return name.split('')[0];
    } else {
      return '';
    }
  };
</script>
