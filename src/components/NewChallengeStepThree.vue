<template>
  <div class="">
    <BaseSection title="Confirm Details">
      <ChallengeDetails :data="newChallenge" invite-key="invitee"></ChallengeDetails>
    </BaseSection>
    <BaseSection title="Share">
      <BaseInfoToCopy>{{ inviteLink }}</BaseInfoToCopy>
      <div class="flex justify-center mt-4 mb-10">
        <BaseButton outline @click="share">Share the link</BaseButton>
      </div>
    </BaseSection>
  </div>
</template>

<script setup lang="ts">
  import BaseSection from './BaseSection.vue';
  import BaseInfoToCopy from './BaseInfoToCopy.vue';
  import BaseButton from './BaseButton.vue';
  import ChallengeDetails from './ChallengeDetails.vue';
  import { useStore } from '../composables/useStore';
  import { useClipboard } from '@vueuse/core';
  import { useFirebase } from '../useFirebase';
  import { computed } from 'vue';

  const { copy, copied } = useClipboard();
  const { userProfile } = useFirebase();
  const { newChallenge, inviteLink } = useStore();

  const shareData = computed(() => ({
    title: 'Zaakceptuj challenge!',
    text: 'Zaakceptuj challenge!',
    url: newChallenge.value.inviteLink,
  }));

  const share = () => {
    if (navigator.share) {
      navigator.share(shareData.value);
    } else {
      copy(newChallenge.value.inviteLink);
    }
  };
</script>
