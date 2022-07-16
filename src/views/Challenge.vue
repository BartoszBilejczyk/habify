<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav :title="$t('titles.challengeDetails')" back-route="active-challenges" />
    <div v-if="loading">{{ $t('common.loading') }}</div>
    <div v-else-if="challenge" class="px-4 flex flex-col flex-1 pt-4 pb-8">
      <h1 class="font-bold text-2xl">{{ challenge.title }}</h1>
      <div class="flex mt-3">
        <BaseLabel class="capitalize" :color="statusColor">{{ challenge.status }}</BaseLabel>
        <BaseLabel color="white" class="ml-3">{{ challenge.points }} {{ $t('common.points') }}</BaseLabel>
        <BaseLabel class="ml-3" color="white">{{ CHALLENGE_TYPES[challenge.type].label }}</BaseLabel>
      </div>
      <!-- actions -->
      <div
        v-if="
          challenge.type === CHALLENGE_TYPES.oneTime.value ||
          (challenge.type === CHALLENGE_TYPES.duration.value && timeEnded)
        "
        class="mt-6"
      >
        <BaseButton full secondary @click="openSelectWinnerModal">{{ $t('challenge.selectWinner') }}</BaseButton>
      </div>
      <!-- add accepted date or start/end -->
      <div class="mt-6 mb-2" v-if="challenge.type === CHALLENGE_TYPES.duration.value">
        <div class="text-white-600 dark:text-white-20 font-bold">{{ $t('challenge.markDone') }}</div>
        <div class="flex overflow-x-auto pb-4 mt-2">
          <div
            v-for="day in Number(challenge.duration)"
            class="px-2 py-4 bg-primary-10 dark:bg-dark-800 mr-2 rounded-lg flex flex-col items-center justify-center"
          >
            <span class="text-xl font-bold">{{ day }}</span>
            <span class="text-xs">Thursday</span>
          </div>
        </div>
      </div>
      <div>
        <div
          class="text-white-600 dark:text-white-20 font-bold"
          :class="challenge.type !== CHALLENGE_TYPES.duration.value && 'mt-6'"
        >
          {{ $t('challenge.challengeParticipant') }}
        </div>
        <BaseBox small class="flex items-center mt-1.5">
          <div
            v-if="personName"
            class="h-6 w-6 text-xs rounded-full bg-white-20 dark:bg-white-400 flex items-center justify-center font-bold"
          >
            {{ getInitials(personName) }}
          </div>
          <div class="font-bold text-sm ml-2">{{ personName }}</div>
        </BaseBox>
      </div>
      <div class="mt-3" v-if="challenge.type === CHALLENGE_TYPES.duration.value">
        <div class="text-white-600 dark:text-white-20 font-bold">{{ $t('challenge.duration') }}:</div>
        <BaseBox small class="mt-2">{{ challenge.duration }} {{ $t('common.days') }}</BaseBox>
      </div>
      <div class="mt-3">
        <div class="text-white-600 dark:text-white-20 font-bold">{{ $t('common.bet') }}</div>
        <BaseBox small class="mt-1.5 relative py-2">
          <div class="w-10/12">{{ challenge.betDetails }}</div>
          <BaseLabel color="white" class="absolute right-2 top-2">{{ challenge.betCategory }}</BaseLabel>
        </BaseBox>
      </div>
      <div class="mt-3">
        <div class="text-white-600 dark:text-white-20 font-bold">{{ $t('challenge.confirmationType') }}</div>
        <BaseBox small class="mt-1.5 capitalize">{{ challenge.confirmationType }}</BaseBox>
      </div>
      <div v-if="challenge.status === CHALLENGE_STATUS.pending.value" class="mt-4">
        <BaseInfoToCopy>{{ challenge.inviteLink }}</BaseInfoToCopy>
        <div class="flex justify-center mt-4 mb-10">
          <BaseButton outline-white @click="share">{{ $t('common.shareLink') }}</BaseButton>
        </div>
      </div>
      <!-- add accepted date or start/end -->
      <div class="mt-6 text-xxs">{{ $t('challenge.createdOn') }}: {{ createdOn }}</div>
      <div class="mt-2 text-xxs">{{ $t('challenge.updatedOn') }}: {{ updatedOn }}</div>
    </div>
    <BaseModalFromBottom :is-open="isModalOpen" @hide="hideModal">
      <h1 class="text-2xl text-center text-white-800 dark:text-white-10">{{ $t('challenge.selectWinner') }}</h1>
      <div class="mt-6 flex flex-col items-stretch justify-center" :class="selectLoading && 'pointer-events-none'">
        <div
          class="m-4 border border-solid rounded-xl border-white-500 dark:border-white-20 p-8 text-center"
          @click="selectWinnerAndLoser(challenge.inviter, challenge.invitee)"
        >
          {{ challenge?.inviter.name }}
        </div>
        <div
          class="m-4 border border-solid rounded-xl border-white-500 dark:border-white-20 p-8 text-center"
          @click="selectWinnerAndLoser(challenge.invitee, challenge.inviter)"
        >
          {{ challenge?.invitee.name }}
        </div>
      </div>
      <div class="text-center mt-4" v-if="selectLoading">{{ $t('common.loading') }}</div>
    </BaseModalFromBottom>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseLabel from '../components/BaseLabel.vue';
  import BaseBox from '../components/BaseBox.vue';
  import BaseInfoToCopy from '../components/BaseInfoToCopy.vue';
  import BaseButton from '../components/BaseButton.vue';
  import BaseModalFromBottom from '../components/BaseModalFromBottom.vue';
  import { useStore } from '../composables/useStore';
  import { computed, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Challenge, UserBasic } from '../types';
  import dayjs from 'dayjs';
  import 'dayjs/locale/pl';
  import 'dayjs/locale/en-gb';
  import { useFirebase } from '../useFirebase';
  import { CHALLENGE_TYPES } from '../helpers/constants';
  import { useClipboard } from '@vueuse/core';
  import { useI18n } from 'vue-i18n';
  import { CHALLENGE_STATUS } from '../helpers/constants';

  dayjs.locale(navigator.language);

  const { challenges, getChallenges } = useStore();
  const { currentRoute } = useRouter();
  const loading = ref(false);
  const selectLoading = ref(false);
  const isModalOpen = ref(false);
  const { userProfileBasic, updateDoc, getDoc } = useFirebase();
  const { copy, copied } = useClipboard();
  const { t } = useI18n();

  onMounted(async () => {
    console.log(challenges.value);
    if (!challenges.value.length) {
      loading.value = true;
    }

    await getChallenges();

    loading.value = false;
  });

  const challenge = computed<Challenge>(
    () => challenges.value.filter((ch: Challenge) => ch.id === currentRoute.value.params.id)[0]
  );

  const updatedOn = computed(() => {
    return dayjs(challenge.value.updatedOn).format('d MMM YYYY HH:mm');
  });

  const createdOn = computed(() => {
    return dayjs(challenge.value.createdOn).format('d MMM YYYY HH:mm');
  });

  const statusColor = computed(() => {
    if (challenge.value.status === CHALLENGE_STATUS.waitsForConfirm.value) {
      return 'coral';
    }
    if (challenge.value.status === CHALLENGE_STATUS.done.value) {
      return 'green';
    }
    if (challenge.value.status === CHALLENGE_STATUS.pending.value) {
      return 'yellow';
    }
    if (challenge.value.status === CHALLENGE_STATUS.active.value) {
      return 'primary';
    }
    if (challenge.value.status === CHALLENGE_STATUS.closed.value) {
      return 'red';
    }

    return 'primary';
  });

  const personName = computed(() => {
    return userProfileBasic.value.id === challenge.value.inviterId
      ? challenge.value.inviter?.name
      : challenge.value.invitee?.name;
  });

  const getInitials = (name: string) => {
    const splitted: string[] = name.split(' ');
    // @ts-ignore
    return splitted.shift().charAt(0) + splitted.pop().charAt(0);
  };

  const shareData = computed(() => ({
    title: `${t('invite.accept')}!`,
    text: `${t('invite.accept')}!`,
    url: challenge.value.inviteLink,
  }));

  const timeEnded = computed(() => true);

  const share = () => {
    if (navigator.share) {
      navigator.share(shareData.value);
    } else {
      copy(challenge.value.inviteLink);
    }
  };

  const hideModal = () => {
    isModalOpen.value = false;
  };

  const openSelectWinnerModal = () => {
    isModalOpen.value = true;
  };

  const selectWinnerAndLoser = async (winner: UserBasic, loser: UserBasic) => {
    selectLoading.value = true;

    let updateData = null;

    if (userProfileBasic.value.id === challenge.value.inviterId) {
      updateData = {
        inviterSelectedWinner: winner,
        inviterSelectedLoser: loser,
      };
    } else {
      updateData = {
        inviteeSelectedWinner: winner,
        inviteeSelectedLoser: loser,
      };
    }

    const updatedStatus =
      challenge.value.inviteeSelectedWinner || challenge.value.inviterSelectedWinner
        ? CHALLENGE_STATUS.done.value
        : CHALLENGE_STATUS.waitsForConfirm.value;

    await updateDoc(`challenges/${challenge.value.id}`, {
      ...updateData,
      status: updatedStatus,
      updatedOn: Date.now(),
    });

    // update store
    const fetchedChallenge = (await getDoc(`challenges/${challenge.value.id}`)) as Challenge;

    if (
      updatedStatus === CHALLENGE_STATUS.done.value &&
      fetchedChallenge.inviterSelectedWinner === fetchedChallenge.inviteeSelectedWinner
    ) {
      // update user points
      console.log('update user points');
    } else {
      console.log('first user choice');
    }

    // handle UI

    // TODO add change choice in UI

    setTimeout(() => {
      hideModal();
      selectLoading.value = false;
      // set timer for the above and then make it 2 seconds total or something.
    }, 1000);
  };
</script>
