<template>
  <h1 class="text-2xl text-center text-white-800">{{ $t('auth.loginTitle') }}</h1>
  <div class="mt-8 flex flex-col w-full">
    <BaseInput class="mb-2" full type="text" :placeholder="$t('auth.email')" v-model="email" />
    <BaseInput class="mb-2" full type="password" :placeholder="$t('auth.password')" v-model="password" />
    <BaseButton class="mt-4" @click="login" primary>
      {{ loading ? $t('common.loading') : $t('auth.login') }}
    </BaseButton>
    <BaseButton
      class="mt-3 ml-auto"
      @click="push({ name: 'register', query: { ...currentRoute.query } })"
      text-secondary
    >
      {{ $t('auth.register') }}
    </BaseButton>
    <BaseButton
      class="ml-auto"
      @click="push({ name: 'forgot-password', query: { ...currentRoute.query } })"
      text-secondary
    >
      {{ $t('auth.forgotPassword') }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import firebase from 'firebase';
  import { useRouter } from 'vue-router';
  import BaseButton from '../components/BaseButton.vue';
  import BaseInput from '../components/BaseInput.vue';
  import { useFirebase } from '../composables/useFirebase';
  import { useUser } from '../composables/useUser';
  import { User } from '../types';

  const email = ref('');
  const password = ref('');
  const { push, currentRoute } = useRouter();
  const { updateDoc, getDocRaw, getDoc } = useFirebase();
  const { userProfile } = useUser();
  const loading = ref(false);

  const emit = defineEmits(['onLogin']);

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
        userProfile.value = (await getDoc(`users/${user.user?.uid}`)) as User;

        console.log(currentRoute.value);
        console.log(userProfile.value);

        if (!userProfile.value.profileFinished || !userProfile.value.onboarded) {
          console.log('name: onboarding');
          await push({ name: 'onboarding', query: { ...currentRoute.value.query, step: '1' } });
        } else if (currentRoute.value.query.backToInvite) {
          emit('onLogin');
        } else {
          console.log('name: active-');
          await push({ name: 'active-challenges' });
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };
</script>
