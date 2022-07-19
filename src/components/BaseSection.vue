<template>
  <div class="mb-6">
    <div class="flex justify-between items-center my-4">
      <h2 class="text-lg text-white-600 dark:text-white">{{ title }}</h2>
      <div class="flex items-center">
        <BaseButton text-secondary @click="handleClick" v-if="seeMore">{{ $t('common.seeMore') }}</BaseButton>
        <BaseButton text-secondary @click="handleClick" v-if="seeAll">{{ $t('common.seeAll') }}</BaseButton>
        <div class="ml-3" v-if="$slots.additional">
          <slot name="additional"></slot>
        </div>
      </div>
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
    seeAll?: boolean;
  }>();

  const { push } = useRouter();

  const handleClick = async () => {
    await push({ name: props.routeName });
  };
</script>
