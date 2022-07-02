<template>
  <div class="w-full h-full">
    <BaseTopNav title="Home" icon="menu">
      <NotificationIcon class="w-5 h-5" />
    </BaseTopNav>
    <div class="px-6 pb-12">
      <div class="px-3 py-4 mt-4 bg-primary text-white flex justify-between rounded-lg">
        <span class="text-lg">
          Create your first challenge.
          <br />
          Build good habits.
        </span>
        <button @click="handleStart">START</button>
      </div>
      <BaseSection title="Your friends" route-name="friends">
        <div class="bg-white p-16 shadow-sm rounded-3xl">slot</div>
      </BaseSection>
      <BaseSection title="Challenge examples" route-name="challenge-examples">
        <div class="bg-white p-16 shadow-sm rounded-3xl">slot</div>
      </BaseSection>
      <BaseSection title="How it works" route-name="how-it-works">
        <div class="bg-white p-16 shadow-sm rounded-3xl">slot</div>
      </BaseSection>
      <BaseSection title="Charities we recommend" route-name="charities">
        <div class="bg-white p-16 shadow-sm rounded-3xl">slot</div>
      </BaseSection>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseSection from '../components/BaseSection.vue';
  import NotificationIcon from '../assets/icons/bell.svg?component';
  import { useRouter } from 'vue-router';

  const { push } = useRouter();

  const handleStart = () => {
    push({ name: 'new-challenge' });
  };
</script>
