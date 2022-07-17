<template>
  <div v-if="userProfile.id" class="w-full h-full flex flex-col flex-1">
    <BaseTopNav :title="$t('titles.dashboard')" :icon="null">
      <div class="relative pr-0.5" @click="openNotificationsModal">
        <NotificationIcon class="w-5 h-5" />
        <div
          v-if="activeNotifications.length"
          class="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary text-xs flex items-center justify-center text-white font-bold"
        >
          {{ activeNotifications.length }}
        </div>
      </div>
    </BaseTopNav>
    <div class="px-4 pb-10">
      <div
        v-if="!challenges.length"
        class="px-5 py-4 mt-4 bg-primary text-white font-bold flex justify-between rounded-lg shadow-lg"
      >
        <span class="text-lg">
          {{ $t('home.createFirstChallenge') }}
          <br />
          {{ $t('home.buildHabits') }}
        </span>
        <button @click="handleStart">{{ $t('common.start') }}</button>
      </div>
      <BaseSection v-else see-all :title="$t('titles.activeChallenges')" route-name="active-challenges">
        <ActiveChallengeList :challenges="challenges.slice(0, 2)" />
      </BaseSection>
      <BaseSection see-all :title="$t('titles.friends')" route-name="friends">
        <div class="bg-white dark:bg-dark-800 px-4 py-12 shadow-lg rounded-2xl">
          <div v-for="friend in userProfile.friends">
            {{ friend.name }}
          </div>
        </div>
      </BaseSection>
      <BaseSection see-all :title="$t('titles.examples')" route-name="challenge-examples">
        <div class="bg-white dark:bg-dark-800 p-16 shadow-lg rounded-2xl">slot</div>
      </BaseSection>
      <BaseSection see-more :title="$t('titles.howItWorks')" route-name="how-it-works">
        <div class="bg-white dark:bg-dark-800 p-16 shadow-lg rounded-2xl">slot</div>
      </BaseSection>
      <BaseSection see-all :title="$t('titles.charitiesRecommended')" route-name="charities">
        <div class="bg-white dark:bg-dark-800 p-16 shadow-lg rounded-2xl">slot</div>
      </BaseSection>
    </div>
    <BaseModalFromBottom :is-open="isModalOpen" @hide="hideModal" :heading="$t('notifications.heading')">
      <NotificationList />
    </BaseModalFromBottom>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseSection from '../components/BaseSection.vue';
  import BaseModalFromBottom from '../components/BaseModalFromBottom.vue';
  import NotificationList from '../components/NotificationList.vue';
  import ActiveChallengeList from '../components/ActiveChallengeList.vue';
  import NotificationIcon from '../assets/icons/bell.svg?component';
  import { useRouter } from 'vue-router';
  import { useUser } from '../composables/useUser';
  import { useStore } from '../composables/useStore';
  import { ref } from 'vue';
  const { userProfile, activeNotifications } = useUser();
  const { push } = useRouter();

  const { challenges } = useStore();

  const isModalOpen = ref(false);

  const hideModal = () => {
    isModalOpen.value = false;
  };

  const openNotificationsModal = () => {
    if (activeNotifications.value.length) {
      isModalOpen.value = true;
    }
  };

  const handleStart = () => {
    push({ name: 'new-challenge' });
  };
</script>
