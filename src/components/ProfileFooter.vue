<template>
  <div class="flex justify-end text-white-300 text-xs px-10 mt-8">
    <!--      Change to button TODO-->
    <BaseButton text-primary @click="logOut">Give feedback</BaseButton>
    <BaseButton text-primary class="ml-6" @click="logOut">Log out</BaseButton>
  </div>
  <div class="px-10 mt-8 text-white-400 text-xs text-center">
    Copyright Web Development Bilejczyk, 2022
    <br />
    version 1.22
  </div>
</template>

<script setup lang="ts">
  import firebase from 'firebase';
  import { useRouter } from 'vue-router';
  import BaseButton from './BaseButton.vue';

  const { push } = useRouter();

  const logOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(async () => {
        await push({ name: 'login' });
      })
      .catch(error => {
        alert(error);
      });
  };
</script>
