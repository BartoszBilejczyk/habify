<template>
  <div class="flex flex-col justify-center items-center h-screen pb-16">
    <h1 class="text-2xl text-center text-white-800">Register for Habify</h1>
    <div class="mt-8 flex flex-col w-64">
      <BaseInput class="mb-2" full type="text" label="Email" placeholder="Email" v-model="email" />
      <BaseInput class="mb-2" full type="password" label="Password" placeholder="Password" v-model="password" />
      <BaseInput
        class="mb-2"
        full
        type="password"
        label="Confirm Password"
        placeholder="Confirm Password"
        v-model="confirmPassword"
      />
      <BaseInput class="mb-2" full type="text" label="Referral" placeholder="Referral" v-model="referral" />
      <BaseButton class="mt-4" @click="register" primary>Register</BaseButton>
      <BaseButton class="mt-2 ml-auto" @click="push({ name: 'login' })" text>Back to sign in</BaseButton>
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
  const password = ref('');
  const confirmPassword = ref('');
  const referral = ref('');

  const { push } = useRouter();

  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(() => {
        push({ name: 'onboarding' });
      });
  };
</script>
