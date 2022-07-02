<template>
  <div class="flex flex-col">
    <label v-if="label" class="text-white-800 mb-1">{{ label }}</label>
    <select
      class="h-10 border outline-none focus:outline-none border-white-600 hover:border-white-800 focus:border-primary rounded-lg w-auto px-3 text-white-800"
      :class="{ 'w-full': full, 'w-fit': !full }"
      :value="modelValue"
      @change="updateValue"
    >
      <option value="A">A</option>
      <option value="B">B</option>
    </select>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    label?: string;
    modelValue: string;
    full?: boolean;
  }>();

  const emit = defineEmits(['update:modelValue']);

  const updateValue = (event: KeyboardEvent) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  };
</script>
