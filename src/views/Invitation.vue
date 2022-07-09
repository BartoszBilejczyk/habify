<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav title="You have been challenged by Paulina!" back-route="home" background />
    <div class="px-4 pt-4 w-full h-full flex-1 flex flex-col justify-center pb-8 bg-primary :dark-bg-dark text-white">
      <div class="text-sm text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab ad, aperiam eius esse, exercitationem fuga harum
      </div>
      <div class="flex flex-col items-center">
        <img :src="image" alt="Invite friend illustration" class="mt-5 mb-8 h-20" />
        <ChallengeDetails on-dark />
        <div class="mt-8 flex flex-col items-center w-full px-6">
          <BaseSlideButton done-text="Accepted" slide-text="Accept Challenge" on-dark />
          <div class="my-2">or</div>
          <BaseButton class="underline">Propose changes</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseButton from '../components/BaseButton.vue';
  import BaseSlideButton from '../components/BaseSlideButton.vue';
  import ChallengeDetails from '../components/ChallengeDetails.vue';
  import { computed } from 'vue';

  const image = computed(() => {
    return new URL('../assets/auth-start.png', import.meta.url);
  });
</script>
