<template>
  <h1>Sign up</h1>
  <div class="flex flex-col m-auto w-64">
    <input class="border block m-2" type="text" placeholder="Email" v-model="email" />
    <input class="border block m-2" type="password" placeholder="Password" v-model="password" />
    <input class="border block m-2" type="password" placeholder="Confirm Password" v-model="confirmPassword" />
    <button @click="register">Submit</button>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import firebase from 'firebase';
  import { useRouter } from 'vue-router';

  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');

  const router = useRouter();

  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(() => {
        router.push({ name: 'onboarding' });
      });
  };
</script>
