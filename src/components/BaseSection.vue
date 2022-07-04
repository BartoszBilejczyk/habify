<template>
  <div class="my-6">
    <div class="flex justify-between items-center my-4">
      <h2 class="text-xl text-white-900">{{ title }}</h2>
      <BaseButton text-primary @click="handleClick" class="text-sm text-white-600" v-if="seeMore">See more</BaseButton>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import BaseButton from './BaseButton.vue';

  const props = defineProps<{
    title: string;
    routeName?: string;
    seeMore?: boolean;
  }>();

  const { push } = useRouter();

  const handleClick = () => {
    push({ name: props.routeName });
  };
</script>
