<template>
  <div
    class="h-6 w-6 text-sm flex items-center justify-center rounded-full font-bold"
    :class="{
      'bg-white-10 text-white-400': onDark,
      'bg-white-20 dark:bg-white-300 text-white-400 dark:text-white-20': !onDark,
    }"
  >
    ?
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    onDark?: boolean;
  }>();
</script>
