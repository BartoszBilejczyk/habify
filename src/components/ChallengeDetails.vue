<template>
  <BaseBox
    class="bg-white-10 dark:bg-dark-800 dark:text-white-20 py-3"
    :class="onDark && 'bg-white text-white-900 py-3'"
  >
    <div class="flex mb-1.5">
      <div class="font-bold grow-0 shrink-0 basis-28">{{ $t('common.challenge') }}</div>
      <div>{{ data.title }}</div>
    </div>
    <div v-if="data.type === 'oneTime'" class="flex mb-1.5">
      <div class="font-bold grow-0 shrink-0 basis-28">{{ $t('common.type') }}</div>
      <div>One time</div>
    </div>
    <div v-if="data.type === CHALLENGE_TYPES.duration.value" class="flex mb-1.5">
      <div class="font-bold grow-0 shrink-0 basis-28">{{ $t('challenge.duration') }}</div>
      <div>{{ data.duration }}</div>
    </div>
    <div class="flex mb-1.5">
      <div class="font-bold grow-0 shrink-0 basis-28">{{ $t('common.bet') }}</div>
      <div>{{ data.betCategory }}. {{ $t('challenge.manualConfirmation') }}.</div>
    </div>
    <div class="flex mb-1.5">
      <div class="font-bold grow-0 shrink-0 basis-28">{{ $t('common.details') }}</div>
      <div>{{ data.betDetails }}</div>
    </div>
    <div v-if="data[keyId]" class="flex mb-1.5">
      <div class="font-bold grow-0 shrink-0 basis-28">{{ $t('common.friend') }}</div>
      <div>{{ data[inviteKey].name }}</div>
    </div>
  </BaseBox>
</template>

<script setup lang="ts">
  import BaseBox from './BaseBox.vue';
  import { Challenge } from '../types';
  import { computed } from 'vue';
  import { CHALLENGE_TYPES } from '../helpers/constants';

  const props = defineProps<{
    onDark?: boolean;
    data?: Challenge;
    inviteKey: 'inviter' | 'invitee';
  }>();

  const keyId = computed(() => `${props.inviteKey}Id`);
</script>
