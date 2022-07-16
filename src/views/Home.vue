<template>
  <div v-if="userProfile.id" class="w-full h-full flex flex-col flex-1">
    <BaseTopNav :title="$t('titles.dashboard')" :icon="null">
      <NotificationIcon class="w-5 h-5" />
    </BaseTopNav>
    <div class="px-4 pb-10">
      <div class="px-5 py-4 mt-4 bg-primary text-white font-bold flex justify-between rounded-lg shadow-lg">
        <span class="text-lg">
          {{ $t('home.createFirstChallenge') }}
          <br />
          {{ $t('home.buildHabits') }}
        </span>
        <button @click="handleStart">{{ $t('home.start') }}</button>
      </div>
      <BaseSection see-more :title="$t('titles.friends')" route-name="friends">
        <div class="bg-white dark:bg-dark-800 px-4 py-12 shadow-lg rounded-3xl">
          <div v-for="friend in userProfile.friends">
            {{ friend.name }}
          </div>
        </div>
      </BaseSection>
      <BaseSection see-more :title="$t('titles.examples')" route-name="challenge-examples">
        <div class="bg-white dark:bg-dark-800 p-16 shadow-lg rounded-3xl">slot</div>
      </BaseSection>
      <BaseSection see-more :title="$t('titles.howItWorks')" route-name="how-it-works">
        <div class="bg-white dark:bg-dark-800 p-16 shadow-lg rounded-3xl">slot</div>
      </BaseSection>
      <BaseSection see-more :title="$t('titles.charitiesRecommended')" route-name="charities">
        <div class="bg-white dark:bg-dark-800 p-16 shadow-lg rounded-3xl">slot</div>
      </BaseSection>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseSection from '../components/BaseSection.vue';
  import NotificationIcon from '../assets/icons/bell.svg?component';
  import { useRouter } from 'vue-router';
  import { useFirebase } from '../useFirebase';
  const { userProfile } = useFirebase();
  const { push } = useRouter();

  const handleStart = () => {
    push({ name: 'new-challenge' });
  };
</script>
