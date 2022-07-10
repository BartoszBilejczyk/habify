<template>
  <div
    class="text-xs font-semibold py-1 px-3 rounded-full"
    :class="{
      'bg-primary-100 text-primary-900': color === 'primary',
      'bg-coral-100 text-coral-900': color === 'coral',
      'bg-green-100 text-green-900': color === 'green',
      'bg-red-100 text-red-900': color === 'red',
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    color: 'primary' | 'coral' | 'green' | 'red';
  }>();
</script>
