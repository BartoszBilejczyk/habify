<template>
  <button
    class="outline-none rounded-lg"
    :class="{
      'h-10 bg-gradient-to-r from-primary-900 to-primary text-white': primary,
      'h-10 bg-gradient-to-r from-coral-900 to-coral text-white': secondary,
      'h-10 border border-primary bg-transparent text-primary': outline,
      'h-10 border border-white bg-transparent text-white': outlineWhite,
      'px-1 py-1 h-auto underline text-coral text-sm font-normal': textPrimary,
      'px-1 py-1 h-auto underline text-white text-sm font-normal': textWhite,
      'h-8 px-4 font-normal': small,
      'font-bold': !small,
      'px-8': !textPrimary && !textWhite,
      'text-lg': !(small || textPrimary || textWhite),
      'h-10 w-full': full,
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
    textWhite?: boolean;
    small?: boolean;
    full?: boolean;
  }>();
</script>
