<template>
  <div class="flex items-center" :class="step === 1 ? 'justify-end' : 'justify-between'">
    <BaseButton :class="step === 1 && 'hidden'" outline @click="$emit('prev')">Back</BaseButton>
    <BaseButton v-if="step !== 3" primary @click="$emit('next')">Continue</BaseButton>
    <BaseButton v-if="step === 3" primary full class="ml-4" @click="$emit('finish')">Finish (Slide)</BaseButton>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from './BaseButton.vue';

  defineProps<{
    step: number;
  }>();
</script>
