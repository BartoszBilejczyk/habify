<template>
  <div class="fixed w-full nav">
    <div class="w-full flex justify-between items-center relative">
      <span v-if="showIcon" class="">
        <BackIcon v-if="icon === 'back'" class="w-5 h-5" />
        <CloseIcon v-if="icon === 'close'" class="w-5 h-5" />
        <MenuIcon v-if="icon === 'menu'" class="w-5 h-5" />
      </span>
      <span class="font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {{ title }}
      </span>
      <div v-if="$slots.default" class="right-0">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import BackIcon from '../assets/icons/back.svg?component';
  import CloseIcon from '../assets/icons/close.svg?component';
  import MenuIcon from '../assets/icons/menu.svg?component';

  type TopNavIcon = 'close' | 'back' | 'menu';

  defineProps({
    icon: {
      type: String as PropType<TopNavIcon>,
      default: 'back'
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    }
  });
</script>

<style>
  .nav {
    /*padding: env(safe-area-inset-top) env(safe-area-inset-right) 0 env(safe-area-inset-left) !important;*/
    padding-top: max(env(safe-inset-area-top), 1.8rem);
  }
</style>
