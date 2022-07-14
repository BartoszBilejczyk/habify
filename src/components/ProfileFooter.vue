<template>
  <div>
    <div class="flex justify-end text-white-300 text-xs px-10 mt-8">
      <BaseButton text-white>{{ $t('profile.giveFeedback') }}</BaseButton>
      <BaseButton text-white class="ml-6" @click="logOut">{{ $t('profile.logOut') }}</BaseButton>
    </div>
    <div class="px-10 mt-8 text-white-10 dark:text-white text-xs text-center">
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

  const { push } = useRouter();

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
