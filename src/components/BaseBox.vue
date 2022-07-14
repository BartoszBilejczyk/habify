<template>
  <div
    class="bg-white-10 dark:bg-dark-800 rounded-xl text-white-900 dark:text-white relative"
    :class="{ 'px-3 py-1.5 ': small, 'px-4 py-3': !small }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    small?: boolean;
  }>();
</script>
