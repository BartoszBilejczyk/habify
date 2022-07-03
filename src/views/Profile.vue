<template>
  <div class="w-full h-full justify-between pb-20">
    <div class="">
      <BaseTopNav title="Profile" background />
      <div class="h-32 w-full bg-gradient-to-t from-primary-900 to-primary relative">
        <ProfileImageBox />
      </div>
      <div class="flex flex-col px-10 mt-16">
        <div
          v-for="item in menuItems"
          class="flex items-center justify-between text-white-700 cursor-pointer border-b border-b-white-100 py-2"
          @click="handleRouteChange(item.name)"
        >
          <ProfileItem :item="item" />
        </div>
      </div>
    </div>
    <ProfileFooter />
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import ProfileImageBox from '../components/ProfileImageBox.vue';
  import ProfileItem from '../components/ProfileItem.vue';
  import ProfileFooter from '../components/ProfileFooter.vue';
  import { RouteName } from '../router';
  import { ref } from 'vue';
  import ShieldSearch from '../assets/icons/shield-search.svg';
  import ShieldStar from '../assets/icons/shield-star.svg';
  import UserMultiple from '../assets/icons/user-multiple.svg';
  import UserSingle from '../assets/icons/user-single.svg';
  import { useRouter } from 'vue-router';

  export interface MenuItem {
    icon: String;
    title: String;
    name: RouteName;
  }

  const { push } = useRouter();

  const menuItems = ref<MenuItem[]>([
    {
      icon: UserSingle,
      title: 'Profile Settings',
      name: 'profile-settings',
    },
    {
      icon: UserMultiple,
      title: 'Invite Friends',
      name: 'profile-invite',
    },
    {
      icon: ShieldSearch,
      title: 'Challenge History',
      name: 'profile-challenge-history',
    },
    {
      icon: ShieldStar,
      title: 'Friends',
      name: 'profile-friends',
    },
    {
      icon: UserSingle,
      title: 'Notification Settings',
      name: 'profile-notification-settings',
    },
    {
      icon: UserSingle,
      title: 'Task Center',
      name: 'profile-task-center',
    },
  ]);

  const handleRouteChange = (name: RouteName) => {
    push({ name });
  };
</script>
