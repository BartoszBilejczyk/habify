<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav title="Challenge details" back-route="active-challenges" />
    <div v-if="loading">Loading...</div>
    <div v-else-if="challenge" class="px-4 flex flex-col flex-1 pt-4 pb-8">
      <h1 class="font-bold text-2xl">{{ challenge.title }}</h1>
      <div class="flex mt-3">
        <BaseLabel class="capitalize" :color="statusColor">{{ challenge.status }}</BaseLabel>
        <BaseLabel color="white" class="ml-3">{{ challenge.points }} points</BaseLabel>
        <BaseLabel class="ml-3" color="white">{{ CHALLENGE_TYPES[challenge.type] }}</BaseLabel>
      </div>
      <!-- add accepted date or start/end -->
      <div class="mt-4 mb-2" v-if="challenge.type === 'duration'">
        <div class="text-white-600 dark:text-white-20 font-bold">Zaznacz zaliczone dni</div>
        <div class="flex overflow-x-auto pb-4 mt-2">
          <div
            v-for="day in Number(challenge.duration)"
            class="px-2 py-4 border border-solid border-white-20 dark:border-white-50 mr-2 rounded-lg flex flex-col items-center justify-center"
          >
            <span class="text-xl font-bold">{{ day }}</span>
            <span class="text-xs">Thursday</span>
          </div>
        </div>
      </div>
      <div>
        <div class="text-white-600 dark:text-white-20 font-bold">Challenge participant</div>
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
      <div class="mt-3" v-if="challenge.type === 'duration'">
        <div class="text-white-600 dark:text-white-20 font-bold">Duration</div>
        <BaseBox small class="mt-2">{{ challenge.duration }} days</BaseBox>
      </div>
      <div class="mt-3">
        <div class="text-white-600 dark:text-white-20 font-bold">Bet</div>
        <BaseBox small class="mt-1.5">
          <div class="flex items-center">
            <div class="text-white-300 dark:text-white-30 text-sm w-14 min-w-fit">Category:</div>
            <BaseLabel color="white" class="ml-3">{{ challenge.betCategory }}</BaseLabel>
          </div>
          <div class="flex items-center mt-2">
            <div class="text-white-300 dark:text-white-30 text-sm w-14 min-w-fit">Details:</div>
            <div class="ml-3">{{ challenge.betDetails }}</div>
          </div>
        </BaseBox>
      </div>
      <div class="mt-3">
        <div class="text-white-600 dark:text-white-20 font-bold">Confirmation Type</div>
        <BaseBox small class="mt-1.5 text-sm capitalize">{{ challenge.confirmationType }}</BaseBox>
      </div>
      <div v-if="challenge.status === 'pending'" class="mt-4">
        <BaseInfoToCopy>{{ challenge.inviteLink }}</BaseInfoToCopy>
        <div class="flex justify-center mt-4 mb-10">
          <BaseButton outline @click="share">Share the link</BaseButton>
        </div>
      </div>
      <div class="mt-6 text-xxs">Challenge created on: {{ createdOn }}</div>
      <div class="mt-2 text-xxs">Challenge updated on: {{ updatedOn }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseLabel from '../components/BaseLabel.vue';
  import BaseBox from '../components/BaseBox.vue';
  import BaseInfoToCopy from '../components/BaseInfoToCopy.vue';
  import BaseButton from '../components/BaseButton.vue';
  import { useStore } from '../composables/useStore';
  import { computed, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Challenge } from '../types';
  import dayjs from 'dayjs';
  import 'dayjs/locale/pl';
  import 'dayjs/locale/en-gb';
  import { useFirebase } from '../useFirebase';
  import { CHALLENGE_TYPES } from '../helpers/constants';
  import { useClipboard } from '@vueuse/core';
  dayjs.locale(navigator.language);

  const { challenges, getChallenges } = useStore();
  const { currentRoute } = useRouter();
  const loading = ref(false);
  const { userProfileBasic } = useFirebase();
  const { copy, copied } = useClipboard();

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
    if (challenge.value.status === 'waitsForConfirm') {
      return 'yellow';
    }
    if (challenge.value.status === 'done') {
      return 'green';
    }
    if (challenge.value.status === 'pending') {
      return 'coral';
    }
    if (challenge.value.status === 'active') {
      return 'primary';
    }
    if (challenge.value.status === 'closed') {
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
    title: 'Zaakceptuj challenge!',
    text: 'Zaakceptuj challenge!',
    url: challenge.value.inviteLink,
  }));

  const share = () => {
    if (navigator.share) {
      navigator.share(shareData.value);
    } else {
      copy(challenge.value.inviteLink);
    }
  };
</script>
