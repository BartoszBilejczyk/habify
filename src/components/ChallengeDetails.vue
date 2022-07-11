<template>
  <BaseBox class="dark:bg-white-20 dark:text-white-900 py-3" :class="onDark && 'bg-white text-white-900 py-3'">
    <div class="flex mb-2">
      <div class="font-bold grow-0 shrink-0 basis-28">Challenge</div>
      <div>{{ data.title }}</div>
    </div>
    <div v-if="data.type === 'oneTime'" class="flex mb-2">
      <div class="font-bold grow-0 shrink-0 basis-28">Type</div>
      <div>One time</div>
    </div>
    <div v-if="data.type === 'duration'" class="flex mb-2">
      <div class="font-bold grow-0 shrink-0 basis-28">Duration</div>
      <div>{{ data.duration }}</div>
    </div>
    <div class="flex mb-2">
      <div class="font-bold grow-0 shrink-0 basis-28">Bet</div>
      <div>{{ data.betCategory }}, manual confirmation.</div>
    </div>
    <div class="flex mb-2">
      <div class="font-bold grow-0 shrink-0 basis-28">Details</div>
      <div>{{ data.betDetails }}</div>
    </div>
    <div v-if="data[keyId]" class="flex mb-2">
      <div class="font-bold grow-0 shrink-0 basis-28">Friend</div>
      <div>{{ data[inviteKey].name }}</div>
    </div>
  </BaseBox>
</template>

<script setup lang="ts">
  import BaseBox from './BaseBox.vue';
  import { Challenge } from '../types';
  import { computed } from 'vue';

  const props = defineProps<{
    onDark?: boolean;
    data?: Challenge;
    inviteKey: 'inviter' | 'invitee';
  }>();

  const keyId = computed(() => `${props.inviteKey}Id`);
</script>
