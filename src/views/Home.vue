<template>
  <div class="w-full h-full">
    <BaseTopNav title="Home">
      <NotificationIcon class="w-5 h-5" />
    </BaseTopNav>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import NotificationIcon from '../assets/icons/bell.svg?component';
</script>
