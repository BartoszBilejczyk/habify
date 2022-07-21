<template>
  <div
    ref="modal"
    class="w-screen base-modal-from-bottom bg-white dark:bg-dark rounded-t-3xl border border-solid border-white dark:border-dark overflow-y-auto"
  >
    <div ref="modalSwiper" @click="handleHide" class="h-14 pt-6 flex justify-center">
      <div class="h-1 w-20 bg-white-30 dark:bg-white-30 rounded-full"></div>
    </div>
    <div class="pb-4 px-6">
      <h1 ref="headingEl" v-if="heading" class="text-2xl text-center text-white-800 dark:text-white-10 mb-6">
        {{ heading }}
      </h1>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { SwipeDirection, useSwipe } from '@vueuse/core';

  const props = defineProps<{
    isOpen: boolean;
    heading?: string;
  }>();

  const emit = defineEmits(['hide']);

  const modal = ref<HTMLElement | null>(null);
  const modalSwiper = ref<HTMLElement | null>(null);
  const headingEl = ref<HTMLElement | null>(null);
  const modalHeight = computed(() => modal.value?.offsetHeight);

  const { direction, lengthY } = useSwipe(modalSwiper, {
    passive: false,
    onSwipeEnd(e: TouchEvent, direction: SwipeDirection) {
      if (
        direction === SwipeDirection.DOWN &&
        lengthY.value < 0 &&
        modalHeight.value &&
        Math.abs(lengthY.value) / modalHeight.value >= 0.01
      ) {
        handleHide();
      }
    },
  });

  const { direction: headingDirection, lengthY: headingLengthY } = useSwipe(headingEl, {
    passive: false,
    onSwipeEnd(e: TouchEvent, headingDirection: SwipeDirection) {
      if (
        headingDirection === SwipeDirection.DOWN &&
        headingLengthY.value < 0 &&
        modalHeight.value &&
        Math.abs(headingLengthY.value) / modalHeight.value >= 0.01
      ) {
        handleHide();
      }
    },
  });

  const isOpenComputed = computed(() => props.isOpen);

  watch(isOpenComputed, async newValue => {
    if (newValue) {
      // @ts-ignore
      modal.value.style.bottom = '0';
    } else {
      // @ts-ignore
      modal.value.style.bottom = '-85vh';
    }
  });

  const handleHide = () => {
    emit('hide');
  };
</script>

<style>
  .base-modal-from-bottom {
    z-index: 999999;
    height: 78vh;
    bottom: -85vh;
    position: fixed;
    transition: bottom 0.3s cubic-bezier(0.39, 0.57, 0.59, 1.01);
    box-shadow: rgba(17, 17, 26, 0.4) 0 8px 24px, rgba(17, 17, 26, 0.4) 0 16px 56px, rgba(17, 17, 26, 0.4) 0 24px 80px;
  }

  .dark .base-modal-from-bottom {
    box-shadow: rgba(255, 255, 255, 0.04) 0 8px 24px, rgba(255, 255, 255, 0.04) 0 16px 56px,
      rgba(255, 255, 255, 0.04) 0 24px 80px;
  }

  @media (display-mode: standalone) {
    .base-modal-from-bottom {
      height: 70vh;
      bottom: -80vh;
    }
  }
</style>
