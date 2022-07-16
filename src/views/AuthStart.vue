<template>
  <div class="flex flex-col items-center justify-between w-full flex-1 pt-8 px-6 pb-8">
    <div class="flex flex-col flex-1 items-center">
      <LottieAnimation :animation-data="AuthStartJSON" :height="lottieHeight" />
      <h2 class="mt-10 text-3xl">{{ $t('auth.welcome') }}</h2>
      <div class="mt-5 px-2 text-center text-sm">
        {{ $t('auth.welcomeDescription.0') }}
        <br />
        <div class="block mt-2">{{ $t('auth.welcomeDescription.1') }}</div>
      </div>
      <!--      <div class="flex mt-8">-->
      <!--        <div-->
      <!--          v-for="i in 3"-->
      <!--          :key="i"-->
      <!--          class="h-2.5 w-2.5 m-1 rounded-full"-->
      <!--          :class="i === 1 ? 'bg-primary' : 'bg-white-20 dark:bg-white'"-->
      <!--        ></div>-->
      <!--      </div>-->
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

  import AuthStartJSON from '../assets/lottie/auth-start.json';
  import BaseButton from '../components/BaseButton.vue';

  const { push } = useRouter();

  const lottieHeight = computed(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return '40vh';
    } else {
      return '30vh';
    }
  });
</script>
