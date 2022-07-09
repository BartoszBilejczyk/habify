<template>
  <div class="fixed left-0 bottom-0 pt-3 px-10 w-full border-t border-t-white-50 bg-white dark:bg-dark-900 menu">
    <div class="flex justify-center">
      <div
        v-for="item in menuItems"
        class="flex flex-col items-center text-xs px-5 cursor-pointer"
        :class="{
          'text-primary font-black': active === item.name,
          'text-white-600 dark:text-white': active !== item.name,
        }"
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
    icon?: string;
    title: string;
    name: RouteNameEnhanced;
  }

  const active = ref<RouteNameEnhanced>('home');

  onMounted(() => {
    setTimeout(() => {
      console.log(currentRoute.value);
      active.value = currentRoute.value.name;
    });
  });

  const menuItems = ref<MenuItem[]>([
    {
      icon: ShieldSearch,
      title: 'Dashboard',
      name: 'home',
    },
    {
      icon: ShieldStar,
      title: 'Challenges',
      name: 'active-challenges',
    },
    {
      icon: UserMultiple,
      title: 'Friends',
      name: 'friends',
    },
    {
      icon: UserSingle,
      title: 'Profile',
      name: 'profile',
    },
    // {
    //   title: 'Admin',
    //   name: 'components',
    // },
  ]);

  const handleRouteChange = (name: RouteName) => {
    active.value = name;
    push({ name });
  };
</script>

<style>
  .menu {
    padding-bottom: calc(env(safe-inset-area-bottom) - 8px);
  }

  @media (display-mode: browser) {
    .menu {
      padding-bottom: 12px;
    }
  }
</style>
