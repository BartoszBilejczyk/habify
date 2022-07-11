<template>
  <div class="flex flex-col">
    <label v-if="label" class="text-white-800 dark:text-white mb-1">{{ label }}</label>
    <select
      class="h-12 border outline-none focus:outline-none border-white-10 bg-white-10 focus:border-white-10 rounded-lg w-auto px-3 text-white-700 dark:bg-dark-800 dark:text-white dark:border-dark-800 dark:hover:border-dark-800 dark:focus:border-dark-800 placeholder-white-100 dark:placeholder-white-30"
      :class="{ 'w-full': full, 'w-fit': !full }"
      :value="modelValue"
      @change="updateValue"
    >
      <option v-for="option in options" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    label?: string;
    modelValue: string;
    full?: boolean;
    options?: {
      value: string;
      label: string;
    }[];
  }>();

  const emit = defineEmits(['update:modelValue']);

  const updateValue = (event: KeyboardEvent) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  };
</script>
