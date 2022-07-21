<template>
  <div v-if="userProfile.id" class="w-full h-full flex flex-col flex-1">
    <BaseTopNav :title="$t('titles.dashboard')" icon="menu" @openModal="openLeftMenuModal">
      <div class="relative pr-0.5" @click="openNotificationsModal">
        <NotificationIcon class="w-5 h-5" />
        <div
          v-if="activeNotificationsLength"
          class="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary text-xs flex items-center justify-center text-white font-bold"
        >
          {{ activeNotificationsLength }}
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
        <ActiveChallenge v-for="challenge in challenges.slice(0, 2)" :challenge="challenge" :user="userProfileBasic" />
        <template #additional>
          <BaseLabel color="primary" @click="handleStartNewChallenge">
            <PlusIcon class="text-primary basis-3 w-3 h-3 mr-1.5" />
            {{ $t('common.new') }}
          </BaseLabel>
        </template>
      </BaseSection>
      <BaseSection see-all :title="$t('titles.friends')" route-name="friends">
        <BaseFriend v-for="friend in userProfile.friends.slice(0, 4)" :friend="friend" small />
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
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import NotificationIcon from '../assets/icons/bell.svg?component';
  import PlusIcon from '../assets/icons/plus.svg?component';
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseLabel from '../components/BaseLabel.vue';
  import BaseFriend from '../components/BaseFriend.vue';
  import BaseSection from '../components/BaseSection.vue';
  import BaseModalFromBottom from '../components/BaseModalFromBottom.vue';
  import BaseModalFromLeft from '../components/BaseModalFromLeft.vue';
  import HomeLeftMenu from '../components/HomeLeftMenu.vue';
  import NotificationList from '../components/NotificationList.vue';
  import ActiveChallenge from '../components/ActiveChallenge.vue';
  import { useRouter } from 'vue-router';
  import { useUser } from '../composables/useUser';
  import { useStore } from '../composables/useStore';

  const { userProfile, userProfileBasic, visibleNotifications, activeNotificationsLength, markNotificationsAsSeen } =
    useUser();
  const { push } = useRouter();
  const { challenges, getChallenges } = useStore();

  const isNotificationModalOpen = ref(false);
  const isLeftMenuModalOpen = ref(false);

  onMounted(async () => {
    if (userProfile.value.id) {
      await getChallenges();
    }
  });

  const hideNotificationModal = async () => {
    isNotificationModalOpen.value = false;

    await markNotificationsAsSeen();
  };

  const openNotificationsModal = () => {
    if (visibleNotifications.value.length) {
      isLeftMenuModalOpen.value = false;
      setTimeout(() => {
        isNotificationModalOpen.value = true;
      }, 100);
    }
  };

  const hideLeftMenuModal = async () => {
    isLeftMenuModalOpen.value = false;

    await markNotificationsAsSeen();
  };

  const openLeftMenuModal = () => {
    isNotificationModalOpen.value = false;
    setTimeout(() => {
      isLeftMenuModalOpen.value = true;
    }, 100);
  };

  const handleStart = async () => {
    await push({ name: 'new-challenge' });
  };

  const handleStartNewChallenge = async () => {
    await push({ name: 'new-challenge' });
  };
</script>
