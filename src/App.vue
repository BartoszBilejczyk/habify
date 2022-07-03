<template>
  <div class="p-safe min-safe-h-screen max-safe-h-screen overflow-auto w-screen app flex flex-col bg-primary">
    <div class="flex flex-col flex-1 bg-white">
      <router-view />
    </div>
    <Menu v-if="!authRoutes.includes(currentRoute.name)" />
  </div>
</template>

<script setup lang="ts">
  import Menu from './components/Menu.vue';
  import { useRouter } from 'vue-router';
  import firebase from 'firebase';

  const authRoutes = ['login', 'register', 'forgot-password', 'onboarding', 'auth-start'];
  import { onMounted } from 'vue';

  const { currentRoute } = useRouter();

  const { push } = useRouter();

  onMounted(() => {
    firebase.auth().onAuthStateChanged(_user => {
      if (!_user?.email) {
        push({ name: 'auth-start' });
      }
    });
  });
</script>
