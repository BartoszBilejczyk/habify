<template>
  <div class="">
    <div
      v-for="item in menuItems"
      class="flex items-center justify-between text-white-600 dark:text-white-20 cursor-pointer border-b border-b-white-20 dark:border-b-white-500 py-4"
      @click="handleRouteChange(item.name)"
    >
      <div class="flex items-center text">
        <component :is="item.icon" class="w-6 h-6 mr-4" />
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RouteName } from '../router';
  import { ref } from 'vue';
  import ShieldSearch from '../assets/icons/shield-search.svg';
  import UserMultiple from '../assets/icons/user-multiple.svg';
  import UserSingle from '../assets/icons/user-single.svg';
  import NotificationIcon from '../assets/icons/bell.svg?component';
  import TaskIcon from '../assets/icons/task.svg?component';
  import HeartIcon from '../assets/icons/heart.svg?component';
  import { useRouter } from 'vue-router';
  import { useUser } from '../composables/useUser';

  export interface MenuItem {
    icon: String;
    title: String;
    name: RouteName;
  }

  const { push, currentRoute } = useRouter();
  const { userProfile } = useUser();

  // TODO translations
  const menuItems = ref<MenuItem[]>([
    {
      icon: TaskIcon,
      title: 'How it works',
      name: 'how-it-works',
    },
    {
      icon: NotificationIcon,
      title: 'Challenge Examples',
      name: 'challenge-examples',
    },
    {
      icon: NotificationIcon,
      title: 'Charities we recommend',
      name: 'charities',
    },
    {
      icon: ShieldSearch,
      title: 'Leaderboard',
      name: 'leaderboard',
    },
    {
      icon: HeartIcon,
      title: 'Donate to appreciate authors',
      name: 'donate',
    },
  ]);

  const handleRouteChange = async (name: RouteName) => {
    await push({ name, query: { ...currentRoute.value.query, back: 'menu' } });
  };
</script>
