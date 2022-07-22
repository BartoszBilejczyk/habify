<template>
  <div class="flex flex-col">
    <label v-if="label" class="text-white-800 dark:text-white mb-1">{{ label }}</label>
    <textarea
      :placeholder="placeholder"
      class="border outline-none focus:outline-none bg-white-10 rounded-lg w-auto px-3 pt-2 text-white-700 dark:bg-dark-800 dark:text-white placeholder-white-50 dark:placeholder-white-50"
      :class="{
        'w-full': full,
        'w-fit': !full,
        'border-red-10 dark:border-red-300': error,
        'border-white-10 dark:border-dark-800 dark:focus:border-dark-800': !error,
      }"
      :value="modelValue"
      @input="updateValue"
      :rows="rows || 3"
    />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    label?: string;
    modelValue: string;
    full?: boolean;
    placeholder?: string;
    rows?: number;
    error?: boolean;
  }>();

  const emit = defineEmits(['update:modelValue']);

  const updateValue = (event: KeyboardEvent) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  };
</script>
