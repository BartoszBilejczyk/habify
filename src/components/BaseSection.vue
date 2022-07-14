<template>
  <div class="mb-6">
    <div class="flex justify-between items-center my-4">
      <h2 class="text-xl text-white-900 dark:text-white">{{ title }}</h2>
      <BaseButton text-secondary @click="handleClick" v-if="seeMore">{{ $t('common.seeMore') }}</BaseButton>
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
