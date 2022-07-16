<template>
  <div
    class="border border-2 border-dashed rounded-3xl px-8 py-4 text-center font-bold text-sm"
    :class="
      onDark
        ? 'border-white-10 dark:border-white-30 text-white-10 dark:text-white-10'
        : 'border-primary text-white-700 dark:text-white-10'
    "
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    onDark?: boolean;
  }>();
</script>
