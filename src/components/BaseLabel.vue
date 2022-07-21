<template>
  <div
    class="text-xs font-bold py-1 px-3 rounded-full whitespace-nowrap flex items-center"
    :class="{
      'bg-primary-10 text-primary-900': color === 'primary' && !active,
      'bg-coral-10 text-coral-900': color === 'coral' && !active,
      'bg-green-10 text-green-900': color === 'green' && !active,
      'bg-red-10 text-red-900': color === 'red' && !active,
      'bg-yellow-20 text-black': color === 'yellow' && !active,
      'bg-white-20 text-white-900 dark:bg-white-10 dark:text-white-900': color === 'white' && !active,
      'border border-solid border-primary-700 bg-primary-700 text-white': color === 'primary' && active,
      'border border-solid border-coral-700 bg-coral-700 text-white': color === 'coral' && active,
      'border border-solid border-green-700 bg-green-700 text-white': color === 'green' && active,
      'border border-solid border-red-700 bg-red-700 text-white': color === 'red' && active,
      'border border-solid border-yellow-900 bg-yellow-700 text-black': color === 'yellow' && active,
      'border border-solid border-white-500 bg-white-200 text-white dark:border-white dark:bg-white-200 dark:text-white':
        color === 'white' && active,
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    color: 'primary' | 'coral' | 'green' | 'red' | 'yellow' | 'white';
    active?: boolean;
  }>();
</script>
