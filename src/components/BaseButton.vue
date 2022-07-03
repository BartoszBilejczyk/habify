<template>
  <button
    class="outline-none rounded-lg"
    :class="{
      'bg-gradient-to-r from-primary-900 to-primary text-white': primary,
      'bg-gradient-to-r from-coral-900 to-coral text-white': secondary,
      'border border-primary bg-transparent text-primary': outline,
      'border border-white bg-transparent text-white': outlineWhite,
      'px-0 h-auto underline text-white-700 size-sm font-normal': textPrimary,
      'px-0 h-auto underline text-white size-sm font-normal': textWhite,
      'h-8 px-4 font-normal': small,
      'h-10 font-semibold': !small,
      'px-8': !textPrimary && !textWhite,
      'w-full': full,
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
