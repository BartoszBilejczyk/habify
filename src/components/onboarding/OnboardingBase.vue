<template>
  <div class="text-white flex flex-col items-center justify-between w-full flex-1 pt-20 pb-12">
    <div class="flex flex-col flex-1 items-center">
      <img :src="imagePath" alt="Onboarding illustration" class="w-48 h-auto" />
      <h2 class="mt-10 text-xl">{{ title }}</h2>
      <div class="mt-4 px-12 text-center">{{ description }}</div>
    </div>

    <OnboardingButtons
      v-if="step !== 1"
      class="mt-3"
      :step="step"
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
