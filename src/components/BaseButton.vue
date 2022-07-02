<template>
  <button
    class="bg-white outline-none rounded-lg"
    :class="{
      'bg-gradient-to-r from-primary-900 to-primary text-white': primary,
      'bg-gradient-to-r from-coral-900 to-coral text-white': secondary,
      'border border-primary bg-transparent text-primary': outline,
      'px-0 h-auto underline text-primary size-sm font-normal': text,
      'h-8 px-4 font-normal': small,
      'px-8 h-10 font-semibold': !small,
      'w-full': full
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
    onDark?: boolean;
    text?: boolean;
    small?: boolean;
    full?: boolean;
  }>();
</script>
