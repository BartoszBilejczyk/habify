<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav title="Friends" back-route="profile" />
    <div v-for="friend in userProfile.friends">
      {{ friend.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import { useFirebase } from '../useFirebase';
  const { userProfile } = useFirebase();
</script>
