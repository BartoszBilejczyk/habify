<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav title="Active Challenges" back-route="home" />
    <div class="px-4 flex flex-col flex-1 pt-4 pb-8">
      <div
        v-if="!challenges.length"
        class="px-5 py-4 mt-4 bg-primary text-white font-bold flex justify-between items-center rounded-lg shadow-lg"
      >
        <span class="text-lg">
          Create your first challenge.
          <br />
          Build good habits.
        </span>
        <BaseButton outline-white small @click="handleStart">START</BaseButton>
      </div>
      <div v-else class="flex flex-col flex-1 justify-between">
        <ActiveChallengeList :challenges="challenges" />
        <BaseButton primary full @click="handleStart">Start new challenge</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseButton from '../components/BaseButton.vue';
  import ActiveChallengeList from '../components/ActiveChallengeList.vue';
  import { useStore } from '../composables/useStore';
  import { onMounted } from 'vue';
  import { useFirebase } from '../useFirebase';

  const { challenges } = useStore();
  const { push } = useRouter();
  const { getCollectionItemsWhere, userProfile } = useFirebase();

  onMounted(async () => {
    // TODO is there better way?
    const inviterChallenges = await getCollectionItemsWhere('challenges', ['inviterId', '==', userProfile.value.id]);
    const inviteeChallenges = await getCollectionItemsWhere('challenges', ['inviteeId', '==', userProfile.value.id]);

    // sort by newest

    challenges.value = [...inviterChallenges, ...inviteeChallenges].sort((a, b) => a.updatedOn - b.udpatedOn);
  });

  const handleStart = () => {
    push({ name: 'new-challenge' });
  };
</script>
