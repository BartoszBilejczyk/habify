<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav :title="$t('titles.friends')" back-route="profile" />
    <div v-for="friend in userProfile.friends">{{ friend.name }} {{ friend.nickname && `(${friend.nickname})` }}</div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import { useUser } from '../composables/useUser';
  const { userProfile } = useUser();
</script>
