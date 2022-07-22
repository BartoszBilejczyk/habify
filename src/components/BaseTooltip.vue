<template>
  <div class="text-xs" v-tooltip="{ content, autoHide: true, triggers: ['touch', 'hover', 'click'] }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  defineProps<{
    content: string;
  }>();

  const isOpen = ref(false);
</script>
