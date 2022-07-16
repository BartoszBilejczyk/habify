<template>
  <div class="flex justify-center">
    <div class="mx-2 py-1 px-2 rounded-2xl text-sm" :class="{ 'bg-primary text-white font-bold': step === 1 }">
      1. {{ $t('common.challenge') }}
    </div>
    <div class="mx-2 py-1 px-2 rounded-2xl text-sm" :class="{ 'bg-primary text-white font-bold': step === 2 }">
      2. {{ $t('common.bet') }}
    </div>
    <div
      class="mx-2 py-1 px-2 rounded-2xl text-sm"
      v-if="hasFriends"
      :class="{ 'bg-primary text-white font-bold': step === 3 }"
    >
      3. {{ $t('common.invite') }}
    </div>
    <div class="mx-2 py-1 px-2 rounded-2xl text-sm" :class="{ 'bg-primary text-white font-bold': step === 4 }">
      {{ hasFriends ? `4. ${$t('common.confirm')}` : `3. ${$t('common.confirm')}` }}
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    step: number;
    hasFriends: boolean;
  }>();
</script>
