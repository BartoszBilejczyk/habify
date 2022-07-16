<template>
  <div class="flex items-center justify-between w-full px-12" :class="step === 5 ? 'justify-end' : 'justify-between'">
    <BaseButton :text-white="!white" :text-primary="white" small :class="step === 5 && 'hidden'" @click="$emit('skip')">
      {{ $t('onboarding.skip') }}
    </BaseButton>
    <BaseButton v-if="step !== 5" :outline-white="!white" :primary="white" @click="$emit('next')">
      {{ $t('onboarding.next') }}
    </BaseButton>
    <BaseSlideButton
      v-if="step === 5"
      primary
      full
      class="ml-4"
      :slide-text="$t('onboarding.slideToFinish')"
      :done-text="$t('onboarding.welcome')"
      :on-dark="!white"
      @success="$emit('finish')"
    />
  </div>
</template>

<script setup lang="ts">
  import BaseButton from '../BaseButton.vue';
  import BaseSlideButton from '../BaseSlideButton.vue';

  defineProps<{
    step: number;
    white: boolean;
  }>();
</script>
