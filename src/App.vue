<template>
  <div class="p-safe max-h-fit min-h-screen w-screen app">
    <div class="min-h-screen">
      <router-view />
    </div>
    <Menu v-if="!authRoutes.includes(currentRoute.name)" />
  </div>
</template>

<script setup lang="ts">
  import Menu from './components/Menu.vue';
  import { useRouter } from 'vue-router';
  import firebase from 'firebase';

  const authRoutes = ['login', 'register', 'forgot-password', 'onboarding'];
  import { onMounted } from 'vue';

  const { currentRoute } = useRouter();

  const { push } = useRouter();

  onMounted(() => {
    firebase.auth().onAuthStateChanged(_user => {
      if (!_user?.email) {
        push({ name: 'login' });
      }
    });
  });
</script>
