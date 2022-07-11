<template>
  <div class="flex flex-col">
    <label v-if="label" class="text-white-800 dark:text-white mb-1">{{ label }}</label>
    <input
      :placeholder="placeholder"
      class="h-12 mb-2 border outline-none focus:outline-none border-white-10 bg-white-10 rounded-lg w-auto px-3 text-white-700 dark:bg-dark-800 dark:text-white dark:border-dark-800 dark:hover:border-dark-800 dark:focus:border-dark-800 placeholder-white-100 dark:placeholder-white-30"
      :class="{ 'w-full': full, 'w-fit': !full }"
      :type="type || 'text'"
      :value="modelValue"
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
    placeholder?: boolean;
    required?: boolean;
  }>();

  const emit = defineEmits(['update:modelValue']);

  const updateValue = (event: KeyboardEvent) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  };
</script>
