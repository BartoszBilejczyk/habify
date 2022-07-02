<template>
  <div class="my-6">
    <div class="flex justify-between items-center my-4">
      <h2 class="text-xl text-white-900 uppe">{{ title }}</h2>
      <button @click="handleClick" class="text-sm underline text-white-700">See more</button>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const props = defineProps<{
    title: string;
    routeName: string;
  }>();

  const { push } = useRouter();

  const handleClick = () => {
    push({ name: props.routeName });
  };
</script>
