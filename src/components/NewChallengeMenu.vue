<template>
  <div class="flex justify-center">
    <div
      class="mx-2 py-1 px-2 rounded-2xl text-sm"
      :class="{ 'bg-primary text-white font-bold': step === 'challenge' }"
    >
      1. {{ $t('common.challenge') }}
    </div>
    <div
      class="mx-2 py-1 px-2 rounded-2xl text-sm"
      v-if="hasFriends"
      :class="{ 'bg-primary text-white font-bold': step === 'invite' }"
    >
      2. {{ $t('common.invite') }}
    </div>
    <div class="mx-2 py-1 px-2 rounded-2xl text-sm" :class="{ 'bg-primary text-white font-bold': step === 'confirm' }">
      {{ hasFriends ? `3. ${$t('common.confirm')}` : `2. ${$t('common.confirm')}` }}
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    step: string;
    hasFriends: boolean;
  }>();
</script>
