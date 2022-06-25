<template>
  <div class="fixed bottom-0 py-3 px-10 w-full">
    <div class="flex justify-between">
      <div
        v-for="item in menuItems"
        class="flex flex-col items-center"
        @click="handleRouteChange"
        :class="{ 'text-coral font-semibold': active === item.name }"
      >
        <component :is="item.icon" class="w-5 h-5" />
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

  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { RouteName } from '../router';

  const { push } = useRouter();

  interface MenuItem {
    icon: String;
    title: String;
    name: String;
    routePath: RouteName;
  }

  const active = ref<RouteName>('home');

  const menuItems = ref<MenuItem[]>([
    {
      icon: ShieldSearch,
      title: 'Home',
      name: 'home',
      routePath: 'home'
    },
    {
      icon: ShieldStar,
      title: 'Challenges',
      name: 'challenges',
      routePath: 'challenges'
    },
    {
      icon: UserMultiple,
      title: 'Friends',
      name: 'friends',
      routePath: 'friends'
    },
    {
      icon: UserSingle,
      title: 'Profile',
      name: 'profile',
      routePath: 'profile'
    }
  ]);

  const handleRouteChange = (name: RouteName) => {
    push({ name });
  };
</script>
