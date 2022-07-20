<template>
  <div class="w-full h-full justify-between pb-20">
    <div class="">
      <BaseTopNav :title="$t('titles.profile')" background />
      <div class="h-40 w-full bg-gradient-to-t from-primary-600 to-primary dark:from-dark dark:to-dark relative">
        <div class="text-white px-10 pt-5 flex flex-col items-center">
          <div class="text-xl">{{ userProfile.name }}</div>
          <div class="mt-2">
            {{ $t('common.points') }}:
            <b>{{ userProfile.points }}</b>
          </div>
          <!--          <div class="mt-1">-->
          <!--            All challenges started:-->
          <!--            <b>{{ userProfile.challenges.length }}</b>-->
          <!--          </div>-->
          <!--          <div class="mt-1">-->
          <!--            Challenges finished:-->
          <!--            <b>{{ userProfile.challenges.filter(ch => ch.status === 'done').length }}</b>-->
          <!--          </div>-->
        </div>
        <ProfileImageBox />
      </div>
      <div class="flex flex-col px-10 mt-16">
        <div
          v-for="item in menuItems"
          class="flex items-center justify-between text-white dark:text-white cursor-pointer border-b border-b-white-20 dark:border-b-white-500 py-2.5"
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

  const { push } = useRouter();
  const { userProfile } = useUser();

  // TODO translations
  const menuItems = ref<MenuItem[]>([
    {
      icon: UserSingle,
      title: 'Profile Preferences',
      name: 'profile-preferences',
    },
    {
      icon: UserMultiple,
      title: 'Invite Friends',
      name: 'profile-invite',
    },
    // {
    //   icon: ShieldStar,
    //   title: 'Friends',
    //   name: 'friends',
    // },
    {
      icon: NotificationIcon,
      title: 'Notification Settings',
      name: 'profile-notification-settings',
    },
    {
      icon: TaskIcon,
      title: 'Task Center',
      name: 'profile-task-center',
    },
    {
      icon: ShieldSearch,
      title: 'Challenge History',
      name: 'profile-challenge-history',
    },
    // {
    //   icon: HeartIcon,
    //   title: 'Donate to appreciate authors',
    //   name: 'donate',
    // },
  ]);

  const handleRouteChange = async (name: RouteName) => {
    await push({ name });
  };
</script>
