<template>
  <div class="text-xs font-semibold py-1 px-3 rounded-full" :class="`bg-${color}-300 text-${color}`">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    color: 'primary' | 'coral' | 'green' | 'red';
  }>();
</script>
