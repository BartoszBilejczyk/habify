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
      <router-view />
    </div>
    <Menu v-if="!noMenu.includes(currentRoute.name)" />
  </div>
</template>

<script setup lang="ts">
  import Menu from './components/Menu.vue';
  import { useRouter } from 'vue-router';
  import firebase from 'firebase';

  const noMenu = ['login', 'register', 'forgot-password', 'onboarding', 'auth-start', 'invitation'];
  import { onMounted } from 'vue';

  const { currentRoute, push } = useRouter();

  onMounted(() => {
    firebase.auth().onAuthStateChanged(_user => {
      if (!_user?.email) {
        push({ name: 'auth-start' });
      }
    });
  });
</script>
