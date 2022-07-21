<template>
  <div class="flex flex-col justify-center items-center h-screen px-4">
    <h1 class="text-2xl text-center text-white-800">{{ $t('auth.loginTitle') }}</h1>
    <div class="mt-8 flex flex-col w-full">
      <BaseInput class="mb-2" full type="text" :placeholder="$t('auth.email')" v-model="email" />
      <BaseInput class="mb-2" full type="password" :placeholder="$t('auth.password')" v-model="password" />
      <BaseButton class="mt-4" @click="login" primary>
        {{ loading ? $t('common.loading') : $t('auth.login') }}
      </BaseButton>
      <BaseButton class="mt-3 ml-auto" @click="push({ name: 'register' })" text-secondary>
        {{ $t('auth.register') }}
      </BaseButton>
      <BaseButton class="ml-auto" @click="push({ name: 'forgot-password' })" text-secondary>
        {{ $t('auth.forgotPassword') }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import firebase from 'firebase';
  import { useRouter } from 'vue-router';
  import BaseButton from '../components/BaseButton.vue';
  import BaseInput from '../components/BaseInput.vue';
  import { User } from '../types';
  import { useFirebase } from '../composables/useFirebase';
  import { useUser } from '../composables/useUser';

  const email = ref('');
  const password = ref('');
  const { push } = useRouter();
  const { updateDoc, getDocRaw } = useFirebase();
  const { userProfile } = useUser();
  const loading = ref(false);

  const login = () => {
    if (!email.value || !password.value) {
      return;
    }

    if (loading.value) {
      return;
    }

    loading.value = true;

    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(async user => {
        (await getDocRaw(`users/${user.user?.uid}`)).onSnapshot(doc => {
          // @ts-ignore
          userProfile.value = { ...doc.data(), id: doc.id };
        });

        if (!userProfile.value.profileFinished || !userProfile.value.onboarded) {
          await push({ name: 'onboarding', query: { step: '1' } });
        } else {
          await push({ name: 'active-challenges' });
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };
</script>
