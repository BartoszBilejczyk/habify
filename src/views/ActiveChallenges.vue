<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav title="Active Challenges" back-route="home">
      <BaseLabel color="primary" @click="handleStartNewChallenge">(icon) New</BaseLabel>
    </BaseTopNav>
    <div class="px-4 flex flex-col flex-1 pt-4 pb-8">
      <div v-if="loading">Loading...</div>
      <div
        v-else-if="!challenges.length"
        class="px-5 py-4 mt-4 bg-primary text-white font-bold flex justify-between items-center rounded-lg shadow-lg"
      >
        <span class="text-lg">
          Create your first challenge.
          <br />
          Build good habits.
        </span>
        <BaseButton outline-white small @click="handleStartNewChallenge">START</BaseButton>
      </div>
      <ActiveChallengeList :challenges="challenges" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  import BaseLabel from '../components/BaseLabel.vue';
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseButton from '../components/BaseButton.vue';
  import ActiveChallengeList from '../components/ActiveChallengeList.vue';
  import { useStore } from '../composables/useStore';
  import { onMounted, ref } from 'vue';
  import { useFirebase } from '../useFirebase';

  const { challenges, getChallenges } = useStore();
  const { push } = useRouter();
  const { getCollectionItemsWhere, userProfile } = useFirebase();
  const loading = ref(false);

  onMounted(async () => {
    if (!challenges.value.length) {
      loading.value = true;
    }

    await getChallenges();

    loading.value = false;
  });

  const handleStartNewChallenge = () => {
    push({ name: 'new-challenge' });
  };
</script>
