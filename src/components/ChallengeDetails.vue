<template>
  <BaseBox :class="onDark && 'bg-white text-white-900 py-3'">
    <div class="flex mb-2">
      <div class="font-bold grow-0 shrink-0 basis-28">Challenge</div>
      <div>{{ data.title }}</div>
    </div>
    <div v-if="data.type === 'oneTime'" class="flex mb-2">
      <div class="font-bold grow-0 shrink-0 basis-28">Occurence Type</div>
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
      <div class="text-sm">{{ data.betDetails }}</div>
    </div>
    <div class="flex mb-2">
      <div class="font-bold grow-0 shrink-0 basis-28">Friend</div>
      <div>Bartek Bilejczyk</div>
    </div>
  </BaseBox>
</template>

<script setup lang="ts">
  //collectionQuery = collectionReference.where(`members.${uid}.active`,"==", true);

  import BaseBox from './BaseBox.vue';

  defineProps<{
    onDark?: boolean;
    data?: any;
  }>();
</script>
