<template>
  <div class="w-full nav pb-3" :class="background && 'bg-primary text-white'">
    <div class="w-full flex items-center relative" :class="{ 'justify-between': showIcon, 'justify-end': !showIcon }">
      <span v-if="showIcon" class="">
        <BackIcon v-if="icon === 'back'" class="w-4 h-4" @click="handleBack" />
        <CloseIcon v-if="icon === 'close'" class="w-5 h-5" />
        <MenuIcon v-if="icon === 'menu'" class="w-5 h-5" />
      </span>
      <span class="font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {{ title }}
      </span>
      <div v-if="$slots.default">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import BackIcon from '../assets/icons/chevron-left.svg?component';
  import CloseIcon from '../assets/icons/close.svg?component';
  import MenuIcon from '../assets/icons/menu.svg?component';
  import { useRouter } from 'vue-router';

  type TopNavIcon = 'close' | 'back' | 'menu';

  const { push } = useRouter();

  const props = defineProps({
    icon: {
      type: String as PropType<TopNavIcon>,
      default: 'back'
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    background: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Home'
    },
    backRoute: {
      type: String,
      default: 'home'
    }
  });

  const handleBack = () => {
    push({ name: props.backRoute });
  };
</script>

<style>
  .nav {
    padding-left: env(safe-inset-area-left) !important;
    padding-top: env(safe-inset-area-top) !important;
    padding-right: env(safe-inset-area-right) !important;
  }
</style>
