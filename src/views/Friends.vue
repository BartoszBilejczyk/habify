<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav title="Friends" back-route="home">
      <BaseLabel color="primary">Base Label</BaseLabel>
    </BaseTopNav>
    <div v-for="friend in userProfile.friends">
      {{ friend.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseLabel from '../components/BaseLabel.vue';
  import { useFirebase } from '../useFirebase';
  const { userProfile } = useFirebase();
</script>
