<template>
  <div
    ref="modal"
    class="w-screen base-modal-from-bottom bg-white dark:bg-dark-800 rounded-t-3xl border border-solid border-white-20 dark:border-white-700"
  >
    <div @click="$emit('hide')" class="h-10 flex items-center justify-center">
      <div class="h-1 w-20 bg-white-30 dark:bg-white-30 rounded-full"></div>
    </div>
    <div class="py-4 px-6">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';

  const props = defineProps<{
    isOpen: boolean;
  }>();

  defineEmits(['hide']);

  const modal = ref(null);

  const isOpenComputed = computed(() => props.isOpen);

  watch(isOpenComputed, async newValue => {
    console.log('before', newValue);
    if (newValue) {
      console.log('true', newValue);
      // @ts-ignore
      modal.value.style.bottom = '0';
    } else {
      console.log('false', newValue);
      // @ts-ignore
      modal.value.style.bottom = '-77vh';
    }
  });
</script>

<style>
  .base-modal-from-bottom {
    z-index: 999999;
    height: 77vh;
    bottom: -77vh;
    position: fixed;
    transition: bottom 0.4s cubic-bezier(0.39, 0.57, 0.59, 1.01);
    box-shadow: rgba(17, 17, 26, 0.1) 0 8px 24px, rgba(17, 17, 26, 0.1) 0 16px 56px, rgba(17, 17, 26, 0.1) 0 24px 80px;
  }

  @media (display-mode: standalone) {
    .base-modal-from-bottom {
      height: 77vh;
      bottom: -77vh;
    }
  }
</style>
