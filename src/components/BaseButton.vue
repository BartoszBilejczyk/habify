<template>
  <button
    class="outline-none rounded-lg"
    :class="{
      'h-12 bg-gradient-to-r from-primary-700 to-primary text-white': primary,
      'h-12 bg-gradient-to-r from-coral-800 to-coral-700 text-white': secondary,
      'h-12 border border-primary bg-transparent text-primary dark:border-white-100 dark:text-white-20': outline,
      'h-12 border border-white bg-transparent text-white': outlineWhite,
      'h-12 border border-white bg-white text-white-800': white,
      'p-1 h-auto underline text-white-900 text-sm font-normal': textPrimary,
      'p-1 h-auto underline text-coral text-sm font-normal': textSecondary,
      'p-1 h-auto underline text-white text-sm font-normal': textWhite,
      'h-8 px-4 font-normal': small,
      'font-bold': !(small || textPrimary || textSecondary || textWhite),
      'px-8': !textPrimary && !textWhite && !textSecondary && !small,
      'text-normal': small || textPrimary || textSecondary || textWhite,
      'h-12 w-full': full,
    }"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  defineProps<{
    primary?: boolean;
    secondary?: boolean;
    outline?: boolean;
    outlineWhite?: boolean;
    textPrimary?: boolean;
    textSecondary?: boolean;
    textWhite?: boolean;
    white?: boolean;
    small?: boolean;
    full?: boolean;
  }>();
</script>
