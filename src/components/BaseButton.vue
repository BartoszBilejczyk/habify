<template>
  <button
    class="outline-none rounded-lg"
    :class="{
      'bg-gradient-to-r from-primary-700 to-primary text-white': primary,
      'bg-gradient-to-r from-coral-800 to-coral-700 text-white': secondary,
      'border border-primary bg-transparent text-primary dark:border-white-100 dark:text-white-20': outline,
      'border border-white bg-transparent text-white': outlineWhite,
      'border border-white bg-white text-white-800': white,
      'p-1 h-auto underline text-white-900 text-sm font-normal': textPrimary,
      'p-1 h-auto underline text-coral text-sm font-normal': textSecondary,
      'p-1 h-auto underline text-white text-sm font-normal': textWhite,
      'h-8 px-3 text-sm': small,
      'h-6 px-2 text-xs': xsmall,
      'font-bold': !(small || xsmall || textPrimary || textSecondary || textWhite),
      'px-8': !textPrimary && !textWhite && !textSecondary && !small && !xsmall,
      'text-normal': small || xsmall || textPrimary || textSecondary || textWhite,
      'h-12 w-full': full,
      'h-12':
        (primary || secondary || outline || outlineWhite || white) &&
        !(small || xsmall || textPrimary || textSecondary || textWhite),
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
    xsmall?: boolean;
    full?: boolean;
  }>();
</script>
