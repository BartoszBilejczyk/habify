<template>
  <div class="">
    <BaseSection title="Confirm Details">
      <ChallengeDetails :data="newChallenge" invite-key="invitee"></ChallengeDetails>
    </BaseSection>
    <!--    <BaseSection title="Share">-->
    <!--      <BaseInfoToCopy>https://habify.com/sad7891789ds</BaseInfoToCopy>-->
    <!--      <div class="flex justify-center mt-4 mb-10">-->
    <!--        <BaseButton text-secondary>Copy share link</BaseButton>-->
    <!--      </div>-->
    <!--    </BaseSection>-->
  </div>
</template>

<script setup lang="ts">
  import BaseSection from './BaseSection.vue';
  import BaseInfoToCopy from './BaseInfoToCopy.vue';
  import BaseButton from './BaseButton.vue';
  import ChallengeDetails from './ChallengeDetails.vue';
  import { useStore } from '../composables/useStore';

  const { newChallenge } = useStore();
</script>
