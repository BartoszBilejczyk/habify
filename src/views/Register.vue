<template>
  <div class="flex flex-col justify-center items-center h-screen pb-16">
    <h1 class="text-2xl text-center text-white-800">Register for Habify</h1>
    <div class="mt-8 flex flex-col w-full px-6">
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
      <BaseInput class="mb-2" full type="text" label="Referral" placeholder="Referral" v-model="usedReferralCode" />
      <BaseButton class="mt-4" @click="register" primary>Register</BaseButton>
      <div class="mt-3 text-center text-sm">
        <span class="text-white-700">Already have an account?</span>
        <BaseButton text-primary @click="push({ name: 'login' })">Sign in</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import firebase from 'firebase';
  import { useRouter } from 'vue-router';
  import BaseButton from '../components/BaseButton.vue';
  import BaseInput from '../components/BaseInput.vue';
  import useFirebase from '../use-firebase';
  import { emptyUser } from '../helpers/empty';
  import { User } from '../types';

  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const usedReferralCode = ref('');
  const errorCode = ref('');
  const errorMessage = ref('');

  const { push, currentRoute } = useRouter();
  const { setDoc } = useFirebase();

  onMounted(() => {
    const referralCode = currentRoute.value.query.referralCode;

    if (referralCode) {
      // @ts-ignore
      usedReferralCode.value = referralCode;
    }
  });

  const register = () => {
    // check if referralCode works
    const userNewReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(async userCredential => {
        const user: User = {
          ...emptyUser,
          id: userCredential?.user?.uid,
          email: userCredential?.user?.email,
          name: userCredential?.user?.displayName,
          phone: userCredential?.user?.phoneNumber,
          image: userCredential?.user?.photoURL,
          referralCode: userNewReferralCode,
          usedReferralCode: usedReferralCode.value,
        };

        await setDoc(`users/${userCredential?.user?.uid}`, user);
        await setDoc(`referralCodes/${userNewReferralCode}`, {
          referralCode: userNewReferralCode,
          userId: userCredential?.user?.uid,
          userEmail: userCredential?.user?.email,
        });
      })
      .then(() => {
        push({ name: 'onboarding' });
      })
      .catch(error => {
        console.error(error);
        errorCode.value = error.code;
        errorMessage.value = error.message;
      });
  };
</script>
