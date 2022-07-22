<template>
  <div
    class="p-safe overflow-auto w-screen app flex flex-col"
    :class="{
      'min-safe-h-screen max-safe-h-screen': !noMenu.includes(currentRoute.name),
      'min-safe-h-fullscreen': noMenu.includes(currentRoute.name),
      'bg-primary dark:bg-dark':
        currentRoute.name === 'invite' ||
        currentRoute.name === 'profile-invite' ||
        currentRoute.name === 'new-challenge-success' ||
        (currentRoute.name === 'onboarding' && (currentRoute.query.step === '2' || currentRoute.query.step === '3')),
      'bg-white': currentRoute.name === 'onboarding' && currentRoute.query.step === '4',
      'bg-green': currentRoute.name === 'onboarding' && currentRoute.query.step === '5',
    }"
  >
    <div class="flex flex-col flex-1" :class="{ 'app-content-with-padding': showMenu }">
      <div v-if="loading">{{ $t('common.loading') }}</div>
      <!--      <router-view v-else v-slot="{ Component }">-->
      <!--        <transition :name="isParentRoute ? 'route' : 'child-route'" mode="out-in">-->
      <!--          <component :is="Component"></component>-->
      <!--        </transition>-->
      <!--      </router-view>-->
      <router-view v-else></router-view>
    </div>
    <!--    TODO find out why it's visible on reload (e.g. invitation view)-->
    <Menu v-if="showMenu" />
  </div>
</template>

<script setup lang="ts">
  import Menu from './components/Menu.vue';
  import { useRouter } from 'vue-router';
  import firebase from 'firebase';
  import { computed, onMounted, ref } from 'vue';
  import { useFirebase } from './composables/useFirebase';
  import { useUser } from './composables/useUser';
  import { emptyUser } from './helpers/empty';

  import { useStore } from './composables/useStore';
  import { useDark } from '@vueuse/core';

  const isDark = useDark();

  const noMenu = ['login', 'register', 'forgot-password', 'onboarding', 'auth-start', 'invite'];
  const noAuthRoutes = ['login', 'register', 'forgot-password', 'auth-start', 'invite'];

  const parentRoutes = ['active-challenges', 'friends', 'profile', 'auth-start', 'onboarding', 'finish-profile'];

  const { currentRoute, push } = useRouter();
  const { firebaseUser, getDocRaw } = useFirebase();
  const { userProfile } = useUser();
  const loading = ref(true);
  const { getChallenges } = useStore();

  // @ts-ignore
  const showMenu = computed(() => !loading.value && !noMenu.includes(currentRoute.value.name));
  // @ts-ignore
  const isParentRoute = computed(() => parentRoutes.includes(currentRoute.value.name));

  onMounted(() => {
    loading.value = true;

    if ('serviceWorker' in navigator) {
      console.log('in');
      caches.keys().then(function (cacheNames) {
        console.log(caches, caches.keys());
        cacheNames.forEach(function (cacheName) {
          console.log(cacheName);
          caches.delete(cacheName);
        });
      });
    }

    firebase.auth().onAuthStateChanged(async user => {
      if (user?.email) {
        (await getDocRaw(`users/${user.uid}`)).onSnapshot(async doc => {
          // @ts-ignore
          userProfile.value = { ...doc.data(), id: doc.id };
          await getChallenges(doc.id);
        });
        firebaseUser.value = user;
        loading.value = false;

        return;
      }

      userProfile.value = { ...emptyUser };
      firebaseUser.value = null;
      loading.value = false;

      if (
        window.location.pathname === '/' ||
        (window.location.pathname !== '/' &&
          !noAuthRoutes.some(routeName => window.location.pathname.includes(routeName)))
      ) {
        await push({ name: 'auth-start' });
      }
    });
  });
</script>

<style>
  @media (display-mode: browser) {
    .app-content-with-padding {
      padding-bottom: 65px;
    }
  }

  /* route transitions */
  .route-enter-from {
    opacity: 0;
    transform: translateX(-50px);
  }
  .route-enter-active {
    transition: all 0.15s ease-out;
  }
  /*.route-leave-to {*/
  /*  opacity: 0;*/
  /*  transform: translateX(50px);*/
  /*}*/
  /*.route-leave-active {*/
  /*  transition: all 0.15s ease-in;*/
  /*}*/

  /* route transitions */
  .child-route-enter-from {
    opacity: 0;
    transform: translateX(50px);
  }
  .child-route-enter-active {
    transition: all 0.15s ease-out;
  }
  /*.child-route-leave-to {*/
  /*  opacity: 0;*/
  /*  transform: translateX(-50px);*/
  /*}*/
  /*.child-route-leave-active {*/
  /*  transition: all 0.15s ease-in;*/
  /*}*/
</style>
