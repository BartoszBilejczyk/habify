<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav :title="$t('titles.challengeDetails')" back-route="active-challenges" />
    <div v-if="loading">{{ $t('common.loading') }}</div>
    <div v-else-if="challenge?.id" class="px-4 flex flex-col flex-1 pt-4 pb-8">
      <h1 class="font-bold text-2xl">{{ challenge.title }}</h1>
      <div class="flex mt-3">
        <BaseLabel class="capitalize" :color="statusColor">{{ CHALLENGE_STATUS[challenge.status]?.label }}</BaseLabel>
        <BaseLabel color="white" class="ml-3">{{ challenge.points }} {{ $t('common.points') }}</BaseLabel>
        <BaseLabel class="ml-3" color="white">{{ CHALLENGE_TYPES[challenge.type]?.label }}</BaseLabel>
      </div>
      <!-- actions -->
      <BaseBox class="my-4 text-sm" v-if="showDecisions || theSameWinner">
        <div v-if="showDecisions">
          <div v-if="decisions?.you">{{ $t('challenge.youChoseWinner') }} {{ decisions.you?.name }}</div>
          <div :class="{ 'mt-2': decisions?.you }" v-if="decisions?.challenger">
            {{ $t('challenge.challengerChoseWinner', { name: decisions.challenger.name }) }}
            {{ decisions.challenger.name }}
          </div>
        </div>
        <div class="text-green font-bold dark:text-green-20" v-if="isWinner">
          {{ $t('challenge.youWon', { name: challenge.inviterSelectedLoser?.name, points: challenge.points }) }}
        </div>
        <div v-else-if="theSameWinner">
          {{ $t('challenge.winnerIs', { name: decisions.you?.name, points: challenge.points }) }}
        </div>
        <div class="mt-2 text-red dark:text-red-50 font-bold" v-if="isLoser">
          {{ $t('challenge.youLost', { points: Number(challenge.points / 2).toFixed(0) }) }}
        </div>
      </BaseBox>
      <div v-if="isLoser" class="p-3 bg-primary-600 rounded-xl text-white">
        <!-- TODO add a question mark why this is manual -->
        {{ $t('challenge.loserDoTheBet') }}
        <b>"{{ challenge.betDetails }}"</b>
      </div>
      <div v-if="isWinner" class="p-3 bg-primary-600 rounded-xl text-white">
        <!-- TODO add a question mark why this is manual -->
        {{ $t('challenge.winnerLoserHasToDoBet', { name: challenge.inviterSelectedLoser?.name }) }}
        <b>"{{ challenge.betDetails }}"</b>
      </div>
      <div
        v-if="
          challenge.status !== CHALLENGE_STATUS.pending.value &&
          challenge.status !== CHALLENGE_STATUS.done.value &&
          (challenge.type === CHALLENGE_TYPES.oneTime.value ||
            (challenge.type === CHALLENGE_TYPES.duration.value && timeEnded)) &&
          !decisions?.you
        "
        class="mt-6"
      >
        <BaseButton full secondary @click="openSelectWinnerModal">
          {{ $t('challenge.selectWinner') }}
        </BaseButton>
      </div>
      <div v-if="allowToChangeAnswer">
        <BaseButton full secondary @click="openSelectWinnerModal">{{ $t('challenge.changeAnswer') }}</BaseButton>
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
      <div class="mt-3">
        <div class="text-white-600 dark:text-white-20 font-bold">{{ $t('common.bet') }}</div>
        <BaseBox small class="mt-1.5 relative py-2">
          <div class="w-10/12">{{ challenge.betDetails }}</div>
          <!--          <BaseLabel color="white" class="absolute right-2 top-2">-->
          <!--            {{ BET_CATEGORY[challenge.betCategory]?.label }}-->
          <!--          </BaseLabel>-->
        </BaseBox>
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
      <!--      <div class="mt-3">-->
      <!--        <div class="text-white-600 dark:text-white-20 font-bold">{{ $t('challenge.confirmationType') }}</div>-->
      <!-- TODO add a question mark wtf -->
      <!--        <BaseBox small class="mt-1.5 capitalize">{{ challenge.confirmationType }}</BaseBox>-->
      <!--      </div>-->
      <div
        v-if="challenge.status === CHALLENGE_STATUS.pending.value && userProfileBasic.id === challenge.inviterId"
        class="mt-4"
      >
        <BaseInfoToCopy>{{ challenge.inviteLink }}</BaseInfoToCopy>
        <div class="flex justify-center mt-6 mb-10">
          <BaseButton outline @click="share">{{ $t('common.shareLink') }}</BaseButton>
        </div>
      </div>
      <div
        v-else-if="challenge.status === CHALLENGE_STATUS.pending.value && userProfileBasic.id === challenge.inviteeId"
        class="mt-6 mb-10"
      >
        <BaseButton primary full @click="goToInvite">View invitation</BaseButton>
        <BaseButton class="mt-6" text-secondary full>Refuse challenge</BaseButton>
      </div>
      <!-- add accepted date or start/end -->
      <div class="mt-6 text-xxs">{{ $t('challenge.createdOn') }}: {{ createdOn }}</div>
      <div class="mt-2 text-xxs">{{ $t('challenge.updatedOn') }}: {{ updatedOn }}</div>
    </div>
    <!--  TODO handle click outside  -->
    <!--  TODO handle slide down  -->
    <BaseModalFromBottom :is-open="isModalOpen" @hide="hideModal" :heading="$t('challenge.selectWinner')">
      <div class="flex flex-col items-stretch justify-center" :class="selectLoading && 'pointer-events-none'">
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
  import { Challenge, Notification, UserBasic } from '../types';
  import dayjs from 'dayjs';
  import 'dayjs/locale/pl';
  import 'dayjs/locale/en-gb';
  import { useFirebase } from '../composables/useFirebase';
  import {
    CHALLENGE_TYPES,
    NOTIFICATION_CATEGORY,
    NOTIFICATION_ACTION,
    CHALLENGE_STATUS,
    BET_CATEGORY,
  } from '../helpers/constants';
  import { useClipboard } from '@vueuse/core';
  import { useI18n } from 'vue-i18n';
  import { useUser } from '../composables/useUser';
  import { emptyChallenge } from '../helpers/empty';

  dayjs.locale(navigator.language);

  const { challenges, getOneChallenge, updateChallenge, challenge, challengeOtherUser, challengeLoggedInUser } =
    useStore();
  const { currentRoute, push } = useRouter();
  const loading = ref(false);
  const selectLoading = ref(false);
  const isModalOpen = ref(false);
  const { updateDoc, getDoc } = useFirebase();
  const { userProfileBasic, updatePoints, addNotification } = useUser();
  const { copy, copied } = useClipboard();
  const { t } = useI18n();

  onMounted(async () => {
    challenge.value = { ...emptyChallenge };
    loading.value = true;
    await getOneChallenge(currentRoute.value.params.id as string);
    loading.value = false;
  });

  const updatedOn = computed(() => {
    return dayjs(challenge.value.updatedOn).format('DD MMM YYYY HH:mm');
  });

  const createdOn = computed(() => {
    return dayjs(challenge.value.createdOn).format('DD MMM YYYY HH:mm');
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
      ? challenge.value.invitee?.name
      : challenge.value.inviter?.name;
  });

  const getInitials = (name: string) => {
    const splitted: string[] = name.split(' ');
    // @ts-ignore
    return splitted.shift().charAt(0) + splitted.pop().charAt(0);
  };

  const shareData = computed(() => ({
    // title: `${t('invite.accept')}!`,
    title: challenge.value.inviteLink,
    // text: `${t('invite.accept')}!`,
    text: challenge.value.inviteLink,
    url: challenge.value.inviteLink,
  }));

  // TODO
  const timeEnded = computed(() => true);

  const decisions = computed(() => {
    if (userProfileBasic.value.id === challenge.value.inviter?.id) {
      if (challenge.value.inviterSelectedWinner || challenge.value.inviteeSelectedWinner) {
        return {
          you: challenge.value.inviterSelectedWinner,
          challenger: challenge.value.inviteeSelectedWinner,
        };
      } else {
        return null;
      }
    }

    if (userProfileBasic.value.id === challenge.value.invitee?.id) {
      if (challenge.value.inviterSelectedWinner || challenge.value.inviteeSelectedWinner) {
        return {
          you: challenge.value.inviteeSelectedWinner,
          challenger: challenge.value.inviterSelectedWinner,
        };
      } else {
        return null;
      }
    }

    return null;
  });

  const theSameWinner = computed(
    () =>
      Boolean(decisions.value) &&
      decisions.value?.you?.id &&
      decisions.value?.challenger?.id &&
      decisions.value?.you?.id === decisions.value?.challenger?.id
  );

  const showDecisions = computed(() => Boolean(decisions.value) && !theSameWinner.value);

  const isLoser = computed(
    () => theSameWinner.value && userProfileBasic.value.id === challenge.value.inviterSelectedLoser?.id
  );

  const isWinner = computed(
    () => theSameWinner.value && userProfileBasic.value.id === challenge.value.inviterSelectedWinner?.id
  );

  const allowToChangeAnswer = computed(
    () => decisions?.value?.you && decisions?.value?.you?.id !== decisions?.value.challenger?.id && !theSameWinner.value
  );

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
      (challenge.value.inviteeSelectedWinner || challenge.value.inviterSelectedWinner) && !allowToChangeAnswer.value
        ? CHALLENGE_STATUS.done.value
        : CHALLENGE_STATUS.waitsForConfirm.value;

    try {
      await updateDoc(`challenges/${challenge.value.id}`, {
        ...updateData,
        status: updatedStatus,
        updatedOn: Date.now(),
      });
    } catch (e) {
      console.log(e);
    }

    const fetchedChallenge = (await getDoc(`challenges/${challenge.value.id}`)) as Challenge;

    updateChallenge(fetchedChallenge);

    console.log(updatedStatus);
    fetchedChallenge.inviterSelectedWinner === fetchedChallenge.inviteeSelectedWinner;

    if (
      updatedStatus === CHALLENGE_STATUS.done.value &&
      fetchedChallenge.inviterSelectedWinner?.id === fetchedChallenge.inviteeSelectedWinner?.id
    ) {
      await updatePoints(winner.id, challenge.value.points);
      await updatePoints(loser.id, challenge.value.points / 2);

      const notificationData: Partial<Notification> = {
        name: `Challenge "${challenge.value.title}" finished.`,

        description: `${userProfileBasic.value.id === winner.id ? 'You' : winner.name} won the challenge and got ${
          challenge.value.points
        } points. ${userProfileBasic.value.id === loser.id ? 'You' : loser.name} lost, but got ${
          challenge.value.points / 2
        } points. Create new challenge to build good habits and give back to the community!`,
        points: challenge.value.points,
        category: NOTIFICATION_CATEGORY.challenge.value,
        challengeId: challenge.value.id,
        actions: [NOTIFICATION_ACTION.createNewChallenge.value],
      };

      console.log(notificationData);
      await addNotification(notificationData);
      await addNotification(notificationData, challengeOtherUser.value.id);
    } else {
      await addNotification(
        {
          name: `${challengeLoggedInUser.value.name} selected the winner of "${challenge.value.title}" challenge`,
          description: '',
          points: 0,
          category: NOTIFICATION_CATEGORY.challenge.value,
          challengeId: challenge.value.id,
          actions: [],
        },
        challengeOtherUser.value.id
      );
    }

    setTimeout(() => {
      hideModal();
      selectLoading.value = false;
      // TODO set timer for the above and then make it 2 seconds total or something.
    }, 500);
  };

  const goToInvite = async () => {
    await push({ name: 'invite', query: { code: challenge.value.id } });
  };
</script>
