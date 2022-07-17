<template>
  <div class="flex flex-col">
    <BaseButton v-if="step !== 4" primary full @click="$emit('next')">{{ $t('common.next') }}</BaseButton>
    <BaseSlideButton
      v-if="step === 4"
      primary
      full
      @success="$emit('finish')"
      :done-text="$t('challenge.challengeCreated')"
      :slide-text="$t('challenge.slideToStart')"
    />
    <div class="h-6">
      <BaseButton full v-if="step !== 1 && !done" class="mt-8 mx-auto" text-secondary @click="$emit('prev')">
        {{ $t('common.back') }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from './BaseButton.vue';
  import BaseSlideButton from './BaseSlideButton.vue';

  defineProps<{
    step: number;
    done: boolean;
  }>();
</script>
