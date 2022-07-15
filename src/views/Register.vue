<template>
  <div class="flex flex-col justify-center items-center h-screen pb-16">
    <h1 class="text-2xl text-center text-white-800">{{ $t('auth.registerTitle') }}</h1>
    <div class="mt-8 flex flex-col w-full px-6">
      <BaseInput class="mb-2" full type="text" :placeholder="$t('auth.email')" v-model="email" />
      <BaseInput class="mb-2" full type="password" :placeholder="$t('auth.password')" v-model="password" />
      <BaseInput
        class="mb-2"
        full
        type="password"
        :placeholder="$t('auth.confirmPassword')"
        v-model="confirmPassword"
      />
      <BaseInput class="mb-2" full type="text" :placeholder="$t('auth.referralCode')" v-model="usedReferralCode" />
      <BaseButton class="mt-4" @click="register" primary>
        {{ loading ? $t('common.loading') : $t('auth.register') }}
      </BaseButton>
      <div class="mt-3 text-center text-sm ml-auto">
        <span class="text-white-700 dark:text-white">{{ $t('auth.alreadyHaveAccount') }}</span>
        <BaseButton text-secondary @click="push({ name: 'login' })">{{ $t('auth.login') }}</BaseButton>
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
  import { useFirebase } from '../useFirebase';
  import { emptyUser } from '../helpers/empty';
  import { User } from '../types';
  import { useStore } from '../composables/useStore';

  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const usedReferralCode = ref('');
  const errorCode = ref('');
  const errorMessage = ref('');
  const loading = ref(false);

  const { push, currentRoute } = useRouter();
  const { setDoc, getCollectionFirstItemWhere, updateDoc } = useFirebase();
  const { referrer } = useStore();

  onMounted(async () => {
    const referralCode = currentRoute.value.query.code;

    if (referralCode) {
      // @ts-ignore
      usedReferralCode.value = referralCode;
    }
  });

  const register = async () => {
    if (loading.value) {
      return;
    }

    loading.value = true;
    // check if referralCode works
    const userNewReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // TODO refactor
    if (usedReferralCode.value) {
      referrer.value = await getCollectionFirstItemWhere('users', ['referralCode', '==', usedReferralCode.value]);
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(async ({ user }) => {
        const newUser: User = {
          ...emptyUser,
          id: user?.uid,
          email: user?.email,
          name: user?.displayName,
          phone: user?.phoneNumber,
          image: user?.photoURL,
          referralCode: userNewReferralCode,
          usedReferralCode: usedReferralCode.value,
        };

        await setDoc(`users/${user?.uid}`, newUser);
        await setDoc(`referralCodes/${userNewReferralCode}`, {
          referralCode: userNewReferralCode,
          userId: newUser.id,
          userEmail: newUser.email,
        });
      })
      .then(() => {
        push({ name: 'onboarding' });
      })
      .catch(error => {
        console.error(error);
        errorCode.value = error.code;
        errorMessage.value = error.message;
      })
      .finally(() => {
        loading.value = false;
      });
  };
</script>
