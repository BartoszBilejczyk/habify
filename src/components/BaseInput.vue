<template>
  <div class="flex flex-col">
    <label v-if="label" class="text-white-800 dark:text-white mb-1">{{ label }}</label>
    <input
      :placeholder="placeholder"
      class="h-12 mb-2 border outline-none focus:outline-none bg-white-10 rounded-lg w-auto px-3 text-white-700 dark:bg-dark-800 dark:text-white placeholder-white-50 dark:placeholder-white-50"
      :class="{
        'w-full': full,
        'w-fit': !full,
        'border-red-10 dark:border-red-300': error,
        'border-white-10 dark:border-dark-800 dark:focus:border-dark-800': !error,
      }"
      :type="type || 'text'"
      :value="modelValue"
      :disabled="disabled"
      @input="updateValue"
    />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    label?: string;
    modelValue: string;
    type?: string;
    full?: boolean;
    placeholder?: string;
    required?: boolean;
    error?: boolean;
    disabled?: boolean;
  }>();

  const emit = defineEmits(['update:modelValue']);

  const updateValue = (event: KeyboardEvent) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  };
</script>
