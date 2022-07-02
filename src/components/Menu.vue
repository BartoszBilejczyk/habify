<template>
  <div class="fixed bottom-0 pt-3 px-10 w-full border-t border-t-white-50">
    <div class="flex justify-center menu">
      <div
        v-for="item in menuItems"
        class="flex flex-col items-center text-xxs text-white-700 mx-5 cursor-pointer"
        :class="{ 'text-coral font-semibold': active === item.name }"
        @click="handleRouteChange(item.name)"
      >
        <component :is="item.icon" class="w-5 h-5 mb-1" />
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ShieldSearch from '../assets/icons/shield-search.svg';
  import ShieldStar from '../assets/icons/shield-star.svg';
  import UserMultiple from '../assets/icons/user-multiple.svg';
  import UserSingle from '../assets/icons/user-single.svg';

  import { ref, onMounted } from 'vue';
  import { RouteRecordName, useRouter } from 'vue-router';
  import { RouteName } from '../router';

  type RouteNameEnhanced = RouteName | RouteRecordName | null | undefined;

  const { push, currentRoute } = useRouter();

  interface MenuItem {
    icon: String;
    title: String;
    name: RouteNameEnhanced;
  }

  const active = ref<RouteNameEnhanced>('home');

  onMounted(() => {
    console.log(currentRoute.value);
    active.value = currentRoute.value.name;
  });

  const menuItems = ref<MenuItem[]>([
    {
      icon: ShieldSearch,
      title: 'Home',
      name: 'home'
    },
    {
      icon: ShieldStar,
      title: 'Challenges',
      name: 'active-challenges'
    },
    {
      icon: UserMultiple,
      title: 'Friends',
      name: 'friends'
    },
    {
      icon: UserSingle,
      title: 'Profile',
      name: 'profile'
    }
  ]);

  const handleRouteChange = (name: RouteName) => {
    active.value = name;
    push({ name });
  };
</script>

<style>
  .menu {
    padding-bottom: env(safe-inset-area-bottom) !important;
  }
</style>
