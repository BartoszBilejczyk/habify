<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav :title="$t('titles.activeChallenges')" back-route="home">
      <BaseLabel color="primary" @click="handleStartNewChallenge">
        <PlusIcon class="text-primary basis-3 w-3 h-3 mr-1.5" />
        {{ $t('common.new') }}
      </BaseLabel>
    </BaseTopNav>
    <div class="px-4 flex flex-col flex-1 pt-4 pb-8">
      <div v-if="loading">{{ $t('common.loading') }}</div>
      <div
        v-else-if="!challenges.length"
        class="px-5 py-4 mt-4 bg-primary text-white flex justify-between items-center rounded-lg shadow-lg"
      >
        <div class="text-lg">
          <span class="font-bold">{{ $t('home.createFirstChallenge') }}</span>
          <br />
          <span>{{ $t('home.buildHabits') }}</span>
        </div>
        <BaseButton outline-white small @click="handleStartNewChallenge">{{ $t('common.start') }}</BaseButton>
      </div>
      <ActiveChallengeList :challenges="challenges" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  import PlusIcon from '../assets/icons/plus.svg?component';
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
