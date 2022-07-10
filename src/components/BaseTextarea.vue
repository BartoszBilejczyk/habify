<template>
  <div class="flex flex-col">
    <label v-if="label" class="text-white-800 dark:text-white mb-1">{{ label }}</label>
    <textarea
      :placeholder="placeholder"
      class="border outline-none focus:outline-none border-white-600 hover:border-white-800 focus:border-primary rounded-lg w-auto px-3 pt-2 text-white-800 dark:bg-white-400 dark:text-white dark:border-white-400 dark:hover:border-white dark:focus:border-white"
      :class="{ 'w-full': full, 'w-fit': !full }"
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
    placeholder?: boolean;
    rows?: number;
  }>();

  const emit = defineEmits(['update:modelValue']);

  const updateValue = (event: KeyboardEvent) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  };
</script>
