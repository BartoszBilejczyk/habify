<template>
  <div
    class="flex flex-col items-center justify-between w-full flex-1 py-12"
    :class="white ? 'text-white-800' : 'text-white'"
  >
    <div class="flex flex-col flex-1 items-center">
      <slot></slot>
      <h2 class="mt-10 text-xl">{{ title }}</h2>
      <div class="mt-4 px-12 text-center">{{ description }}</div>
    </div>

    <OnboardingButtons
      v-if="step !== 1"
      class="mt-3"
      :step="step"
      :white="white"
      @next="$emit('next')"
      @skip="$emit('skip')"
      @finish="$emit('finish')"
    />
  </div>
</template>

<script setup lang="ts">
  import OnboardingButtons from './OnboardingButtons.vue';
  import { computed } from 'vue';

  const props = defineProps<{
    title: string;
    description: string;
    step: number;
    white?: boolean;
  }>();

  const imagePath = computed(() => {
    switch (props.step) {
      case 2:
        return new URL('../../assets/onboarding-illustration.png', import.meta.url);
      case 3:
        return new URL('../../assets/onboarding-illustration.png', import.meta.url);
      case 4:
        return new URL('../../assets/onboarding-illustration.png', import.meta.url);
    }
  });
</script>
