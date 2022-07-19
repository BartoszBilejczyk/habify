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
      <ActiveChallenge v-for="challenge in challenges.slice(0, 2)" :challenge="challenge" :user="userProfileBasic" />
      <div
        v-if="!loading"
        class="px-3 py-2 mb-4 bg-primary text-white flex justify-between items-center rounded-lg shadow-lg"
      >
        <div>
          <span class="font-bold">
            {{ challenges.length ? $t('home.createAnotherChallenge') : $t('home.createFirstChallenge') }}
          </span>
          <br />
          <span>{{ $t('home.buildHabits') }}</span>
        </div>
        <BaseButton outline-white small @click="handleStartNewChallenge">
          {{ challenges.length ? $t('common.create') : $t('common.start') }}
        </BaseButton>
      </div>
      <ActiveChallenge v-for="challenge in challenges.slice(2)" :challenge="challenge" :user="userProfileBasic" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  import PlusIcon from '../assets/icons/plus.svg?component';
  import BaseLabel from '../components/BaseLabel.vue';
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseButton from '../components/BaseButton.vue';
  import ActiveChallenge from '../components/ActiveChallenge.vue';
  import { useStore } from '../composables/useStore';
  import { onMounted, ref } from 'vue';
  import { useFirebase } from '../composables/useFirebase';
  import { useUser } from '../composables/useUser';

  const { challenges, getChallenges } = useStore();
  const { push } = useRouter();
  const { getCollectionItemsWhere } = useFirebase();
  const { userProfileBasic } = useUser();
  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;

    await getChallenges();

    loading.value = false;
  });

  const handleStartNewChallenge = async () => {
    await push({ name: 'new-challenge' });
  };
</script>
