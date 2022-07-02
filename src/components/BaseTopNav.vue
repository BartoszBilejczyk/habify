<template>
  <div class="fixed w-full top-0 left-0 py-2">
    <div class="w-full flex justify-between items-center relative">
      <span v-if="showIcon" class="">
        <ShieldSearch class="w-5 h-5" />
      </span>
      <span class="font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {{ title }}
      </span>
      <div class="right-0">
        <slot>Slot</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import ShieldSearch from '../assets/icons/shield-search.svg?component';

  type TopNavIcon = 'close' | 'back';

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
