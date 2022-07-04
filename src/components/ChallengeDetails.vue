<template>
  <BaseBox :class="onDark && 'bg-white text-white-900 py-3'">
    <div class="flex mb-2">
      <div class="font-bold grow-0 shrink-0 basis-28">Challenge</div>
      <div>Who makes most pushups.</div>
    </div>
    <div class="flex mb-2">
      <div class="font-bold grow-0 shrink-0 basis-28">Duration</div>
      <div>7 days.</div>
    </div>
    <div class="flex mb-2">
      <div class="font-bold grow-0 shrink-0 basis-28">Bet</div>
      <div>Social, manual confirmation.</div>
    </div>
    <div class="flex mb-2">
      <div class="font-bold grow-0 shrink-0 basis-28">Details</div>
      <div class="text-sm">Share a post which will encourage people to pay for cos charytatywnego.</div>
    </div>
    <div class="flex mb-2">
      <div class="font-bold grow-0 shrink-0 basis-28">Friend</div>
      <div>Bartek Bilejczyk</div>
    </div>
  </BaseBox>
</template>

<script setup lang="ts">
  import BaseBox from './BaseBox.vue';

  defineProps<{
    onDark?: boolean;
  }>();
</script>
