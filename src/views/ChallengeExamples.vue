<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav :title="$t('titles.challengeExamples')" back-route="active-challenges" />
    <div class="px-5">
      <ChallengeExamplesList />
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import ChallengeExamplesList from '../components/ChallengeExamplesList.vue';
</script>
