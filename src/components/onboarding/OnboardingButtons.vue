<template>
  <div class="flex items-center justify-between w-full px-12" :class="step === 4 ? 'justify-end' : 'justify-between'">
    <BaseButton text-white small :class="step === 4 && 'hidden'" @click="$emit('skip')">Skip</BaseButton>
    <BaseButton v-if="step !== 4" outline-white @click="$emit('next')">Next</BaseButton>
    <BaseButton v-if="step === 4" outline-white full class="ml-4" @click="$emit('finish')">Finish (Slide)</BaseButton>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from '../BaseButton.vue';

  defineProps<{
    step: number;
  }>();
</script>
