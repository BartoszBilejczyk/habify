<template>
  <div class="text-xs" v-tooltip="{ content, triggers: ['touch', 'hover', 'click'] }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    content: string;
  }>();
</script>
