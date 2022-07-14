<template>
  <div class="flex flex-col items-center justify-between w-full flex-1 pt-8 px-6 pb-8">
    <div class="flex flex-col flex-1 items-center">
      <img :src="imagePath" alt="Onboarding illustration" class="w-48 h-auto" />
      <h2 class="mt-10 text-3xl">{{ $t('auth.welcome') }}</h2>
      <div class="mt-5 px-6 text-center">
        {{ $t('auth.welcomDescription') }}
      </div>
      <div class="flex mt-8">
        <div
          v-for="i in 3"
          :key="i"
          class="h-3 w-3 m-1 rounded-full"
          :class="i === 1 ? 'bg-primary' : 'bg-white-20 dark:bg-white'"
        ></div>
      </div>
    </div>

    <BaseButton primary full class="mt-10" @click="push({ name: 'register' })">{{ $t('auth.register') }}</BaseButton>
    <div class="mt-5 text-center text-sm">
      <span class="text-white-700 dark:text-white">{{ $t('auth.alreadyHaveAccount') }}</span>
      <BaseButton text-secondary @click="push({ name: 'login' })">{{ $t('auth.login') }}</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  import BaseButton from '../components/BaseButton.vue';

  const { push } = useRouter();

  const imagePath = computed(() => {
    return new URL('../assets/auth-start.png', import.meta.url);
  });
</script>
