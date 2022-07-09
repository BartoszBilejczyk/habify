<template>
  <div class="flex items-center justify-between w-full px-12" :class="step === 4 ? 'justify-end' : 'justify-between'">
    <BaseButton text-white small :class="step === 4 && 'hidden'" @click="$emit('skip')">Skip</BaseButton>
    <BaseButton v-if="step !== 4" outline-white @click="$emit('next')">Next</BaseButton>
    <BaseSlideButton
      v-if="step === 4"
      primary
      full
      class="ml-4"
      slide-text="Slide to finish"
      done-text="Welcome to Habbi"
      on-dark
      @success="$emit('finish')"
    />
  </div>
</template>

<script setup lang="ts">
  import BaseButton from '../BaseButton.vue';
  import BaseSlideButton from '../BaseSlideButton.vue';

  defineProps<{
    step: number;
  }>();
</script>
