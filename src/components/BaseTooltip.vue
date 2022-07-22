<template>
  <div class="text-xs" v-tooltip="{ content, autoHide: true, triggers: ['touch', 'hover', 'click'] }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    content: string;
  }>();
</script>
