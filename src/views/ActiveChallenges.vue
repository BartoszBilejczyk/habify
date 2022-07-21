<template>
  <div class="w-full h-full flex flex-col flex-1">
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
    <div class="px-4 flex flex-col flex-1 pt-5 pb-8">
      <div v-if="loading">{{ $t('common.loading') }}</div>
      <ActiveChallenge v-for="challenge in challenges.slice(0, 2)" :challenge="challenge" :user="userProfileBasic" />
      <div
        v-if="!loading"
        class="mb-4 bg-primary text-white flex justify-between items-center rounded-lg shadow-lg"
        :class="{ 'px-3 py-2': challenges.length, 'px-5 py-4': !challenges.length }"
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
    <BaseModalFromBottom
      :is-open="isNotificationModalOpen"
      @hide="hideNotificationModal"
      :heading="$t('notifications.heading')"
    >
      <NotificationList v-if="isNotificationModalOpen" />
    </BaseModalFromBottom>
    <BaseModalFromLeft :is-open="isLeftMenuModalOpen" @hide="hideLeftMenuModal">
      <HomeLeftMenu @hide="hideLeftMenuModal" />
    </BaseModalFromLeft>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  import NotificationIcon from '../assets/icons/bell.svg?component';
  import BaseModalFromBottom from '../components/BaseModalFromBottom.vue';
  import BaseModalFromLeft from '../components/BaseModalFromLeft.vue';
  import HomeLeftMenu from '../components/HomeLeftMenu.vue';
  import NotificationList from '../components/NotificationList.vue';
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseButton from '../components/BaseButton.vue';
  import ActiveChallenge from '../components/ActiveChallenge.vue';
  import { useStore } from '../composables/useStore';
  import { onMounted, ref } from 'vue';
  import { useFirebase } from '../composables/useFirebase';
  import { useUser } from '../composables/useUser';

  const { challenges, getChallenges } = useStore();
  const { push, currentRoute, replace } = useRouter();
  const { getCollectionItemsWhere } = useFirebase();
  const { userProfile, userProfileBasic, visibleNotifications, activeNotificationsLength, markNotificationsAsSeen } =
    useUser();
  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;

    await getChallenges();

    loading.value = false;
  });

  const handleStartNewChallenge = async () => {
    await push({ name: 'new-challenge' });
  };

  const isNotificationModalOpen = ref(false);
  const isLeftMenuModalOpen = ref(false);

  onMounted(async () => {
    if (currentRoute.value.query?.back === 'menu') {
      openLeftMenuModal();
      await replace({ query: {} });
    }

    if (userProfile.value.id) {
      await getChallenges();
    }
  });

  const hideNotificationModal = async () => {
    isNotificationModalOpen.value = false;

    await markNotificationsAsSeen();
  };

  const openNotificationsModal = () => {
    if (isNotificationModalOpen.value) {
      return;
    }

    if (isLeftMenuModalOpen.value) {
      setTimeout(() => {
        isNotificationModalOpen.value = true;
      }, 100);
    } else {
      isNotificationModalOpen.value = true;
    }

    isLeftMenuModalOpen.value = false;
  };

  const hideLeftMenuModal = async () => {
    isLeftMenuModalOpen.value = false;

    await markNotificationsAsSeen();
  };

  const openLeftMenuModal = () => {
    if (isNotificationModalOpen.value) {
      setTimeout(() => {
        isLeftMenuModalOpen.value = true;
      }, 100);
    } else {
      isLeftMenuModalOpen.value = true;
    }

    isNotificationModalOpen.value = false;
  };
</script>
