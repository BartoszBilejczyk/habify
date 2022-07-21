<template>
  <div class="flex">
    <input
      type="checkbox"
      class="h-5 w-5 shrink-0 border outline-none focus:outline-none border-white-600 hover:border-white-800 checked:border-primary mt-1"
      :value="modelValue"
      @input="updateValue"
    />
    <label v-if="label" class="ml-2.5 text-white-800 dark:text-white leading-5 text-sm">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    label?: string;
    modelValue: string;
  }>();

  const emit = defineEmits(['update:modelValue']);

  const updateValue = (event: KeyboardEvent) => {
    // @ts-ignore
    emit('update:modelValue', event.target.checked);
  };
</script>

<style scoped></style>
