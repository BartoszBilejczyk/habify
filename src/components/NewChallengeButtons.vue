<template>
  <div class="flex flex-col">
    <BaseButton v-if="step !== 'confirm'" primary full @click="$emit('next')">Next</BaseButton>
    <BaseSlideButton
      v-if="step === 'confirm'"
      primary
      full
      @success="$emit('finish')"
      done-text="Challenge created"
      slide-text="Slide to start!"
    />
    <BaseButton v-if="step !== 'challenge' && !done" class="mt-4" text-secondary @click="$emit('prev')">
      Back
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from './BaseButton.vue';
  import BaseSlideButton from './BaseSlideButton.vue';

  defineProps<{
    step: string;
    done: boolean;
  }>();
</script>
