<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav :title="$t('titles.betExamples')" back-route="active-challenges" />
    <div class="px-5">
      <BetExamplesList />
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BetExamplesList from '../components/BetExamplesList.vue';
</script>
