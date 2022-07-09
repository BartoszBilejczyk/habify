<template>
  <div
    class="p-safe overflow-auto w-screen app flex flex-col"
    :class="{
      'min-safe-h-screen max-safe-h-screen': !noMenu.includes(currentRoute.name),
      'min-safe-h-fullscreen': noMenu.includes(currentRoute.name),
      'bg-primary':
        currentRoute.name === 'profile' ||
        currentRoute.name === 'invitation' ||
        currentRoute.name === 'profile-invite' ||
        (currentRoute.name === 'onboarding' && currentRoute.query.step === '2'),
      'bg-green': currentRoute.name === 'onboarding' && currentRoute.query.step === '3',
      'bg-coral': currentRoute.name === 'onboarding' && currentRoute.query.step === '4',
    }"
  >
    <div class="flex flex-col flex-1 bg-white">
      <div v-if="loading"></div>
      <router-view v-else />
    </div>
    <Menu v-if="!loading && !noMenu.includes(currentRoute.name)" />
  </div>
</template>

<script setup lang="ts">
  import Menu from './components/Menu.vue';
  import { useRouter } from 'vue-router';
  import firebase from 'firebase';
  import { onMounted, ref } from 'vue';
  import { useFirebase } from './useFirebase';
  import { emptyUser } from './helpers/empty';
  import { User } from './types';

  const noMenu = ['login', 'register', 'forgot-password', 'onboarding', 'auth-start', 'invitation'];

  const { currentRoute, push } = useRouter();
  const { userProfile, firebaseUser, getDoc } = useFirebase();
  const loading = ref(true);

  onMounted(async () => {
    await firebase.auth().onAuthStateChanged(async user => {
      if (!user?.email) {
        userProfile.value = { ...emptyUser };
        firebaseUser.value = null;
        await push({ name: 'auth-start' });
        loading.value = false;
      } else {
        userProfile.value = (await getDoc(`users/${user.uid}`)) as User;
        firebaseUser.value = user;
        loading.value = false;
      }
    });
  });
</script>
