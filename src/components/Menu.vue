<template>
  <div class="fixed bottom-0 py-2 px-10 w-full">
    <div class="flex justify-center">
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

  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { RouteName } from '../router';

  const { push } = useRouter();

  interface MenuItem {
    icon: String;
    title: String;
    name: RouteName;
  }

  const active = ref<RouteName>('home');

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
