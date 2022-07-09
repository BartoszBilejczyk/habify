<template>
  <div class="flex flex-col justify-center items-center h-screen pb-16 px-6">
    <h1 class="text-2xl text-center text-white-800">Forgot your password?</h1>
    <div class="mt-8 flex flex-col w-full">
      <BaseInput class="mb-2" full type="text" label="Email" placeholder="Email" v-model="email" />
      <BaseButton class="mt-4" @click="resetPassword" primary>Reset password</BaseButton>
      <BaseButton class="mt-2 ml-auto" @click="push({ name: 'login' })" text-secondary>Back to sign in</BaseButton>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import firebase from 'firebase';
  import { useRouter } from 'vue-router';
  import BaseButton from '../components/BaseButton.vue';
  import BaseInput from '../components/BaseInput.vue';

  const email = ref('');
  const { push } = useRouter();

  const resetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email.value)
      .then(() => {
        push({ name: 'login' });
      });
  };
</script>
