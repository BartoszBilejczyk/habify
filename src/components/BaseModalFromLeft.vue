<template>
  <div
    ref="modal"
    class="p-safe w-screen base-modal-from-left bg-white dark:bg-dark rounded-r-3xl overflow-y-auto flex flex-col"
  >
    <div class="relative">
      <div class="absolute right-2.5 top-2">
        <CloseIcon class="w-8 h-8 text-white-200 dark:text-white-20" @click="$emit('hide')" />
      </div>
      <div class="pb-4 px-6 p-6">
        <slot></slot>
      </div>
      <div ref="modalEl" class="flex-1" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { SwipeDirection, useSwipe } from '@vueuse/core';
  import CloseIcon from '../assets/icons/close.svg?component';
  import { onClickOutside } from '@vueuse/core';

  const props = defineProps<{
    isOpen: boolean;
    heading?: string;
  }>();

  const emit = defineEmits(['hide']);

  const modal = ref<HTMLElement | null>(null);
  const modalEl = ref<HTMLElement | null>(null);
  const headingEl = ref<HTMLElement | null>(null);
  const modalWidth = computed(() => modal.value?.offsetWidth);

  onClickOutside(modal, () => {
    if (props.isOpen) {
      emit('hide');
    }
  });

  const { direction, lengthX } = useSwipe(modalEl, {
    passive: false,
    onSwipeEnd(e: TouchEvent, direction: SwipeDirection) {
      if (
        direction === SwipeDirection.LEFT &&
        lengthX.value > 0 &&
        modalWidth.value &&
        Math.abs(lengthX.value) / modalWidth.value >= 0.01
      ) {
        handleHide();
      }
    },
  });

  const { direction: headingDirection, lengthX: headingLengthX } = useSwipe(headingEl, {
    passive: false,
    onSwipeEnd(e: TouchEvent, headingDirection: SwipeDirection) {
      console.log(headingLengthX);
      if (
        headingDirection === SwipeDirection.LEFT &&
        headingLengthX.value > 0 &&
        modalWidth.value &&
        Math.abs(headingLengthX.value) / modalWidth.value >= 0.01
      ) {
        handleHide();
      }
    },
  });

  const isOpenComputed = computed(() => props.isOpen);

  watch(isOpenComputed, async newValue => {
    if (newValue) {
      // @ts-ignore
      modal.value.style.left = '0';
    } else {
      // @ts-ignore
      modal.value.style.left = '-93vw';
    }
  });

  const handleHide = () => {
    emit('hide');
  };
</script>

<style>
  .base-modal-from-left {
    z-index: 999999;
    height: 100vh;
    width: 90vw;
    top: -1px;
    left: -93vw;
    position: fixed;
    transition: left 0.3s cubic-bezier(0.39, 0.57, 0.59, 1.01);
    box-shadow: rgba(17, 17, 26, 0.2) 0 8px 20px, rgba(17, 17, 26, 0.2) 0 16px 20px, rgba(17, 17, 26, 0.2) 0 24px 20px;
  }

  .dark .base-modal-from-left {
    box-shadow: rgba(255, 255, 255, 0.04) 0 8px 20px, rgba(255, 255, 255, 0.04) 0 16px 20px,
      rgba(255, 255, 255, 0.04) 0 24px 20px;
  }
</style>
