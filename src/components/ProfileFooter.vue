<template>
  <div>
    <div class="flex justify-end text-white-300 text-xs px-10 mt-8">
      <BaseButton :text-white="isDark" :text-primary="!isDark">{{ $t('profile.giveFeedback') }}</BaseButton>
      <BaseButton :text-white="isDark" :text-primary="!isDark" class="ml-6" @click="logOut">
        {{ $t('profile.logOut') }}
      </BaseButton>
    </div>
    <div class="px-10 mt-8 text-white-500 dark:text-white-10 text-xs text-center">
      {{ $t('profile.copyRight') }}
      <br />
      {{ $t('profile.version') }} 1.22
    </div>
  </div>
</template>

<script setup lang="ts">
  import firebase from 'firebase';
  import { useRouter } from 'vue-router';
  import BaseButton from './BaseButton.vue';
  import { useDark } from '@vueuse/core';

  const { push } = useRouter();
  const isDark = useDark();

  const logOut = async () => {
    firebase
      .auth()
      .signOut()
      .then(async () => {
        await push({ name: 'auth-start' });
      })
      .catch(error => {
        alert(error);
      });
  };
</script>
