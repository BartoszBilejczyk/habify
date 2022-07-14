<template>
  <div
    class="text-xs font-bold py-1 px-3 rounded-full whitespace-nowrap"
    :class="{
      'bg-primary-50 text-primary-900': color === 'primary',
      'bg-coral-50 text-coral-900': color === 'coral',
      'bg-green-50 text-green-900': color === 'green',
      'bg-red-50 text-red-900': color === 'red',
      'bg-yellow-50 text-yellow-900': color === 'yellow',
      'bg-white-20 text-white-900 dark:bg-white-10 dark:text-white-900': color === 'white',
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    color: 'primary' | 'coral' | 'green' | 'red' | 'yellow' | 'white';
  }>();
</script>
