<template>
  <div class="flex flex-col">
    <label v-if="label" class="text-white-800 dark:text-white mb-1" :class="required && 'font-bold'">
      {{ label }}
    </label>
    <input
      :placeholder="placeholder"
      class="h-10 border outline-none focus:outline-none border-white-600 hover:border-white-800 focus:border-primary rounded-lg w-auto px-3 text-white-800 dark:bg-white-400 dark:text-white dark:border-white-400 dark:hover:border-white dark:focus:border-white"
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
