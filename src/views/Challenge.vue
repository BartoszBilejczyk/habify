<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav title="Challenge details" back-route="active-challenges" />
    <div v-if="loading">Loading...</div>
    <div v-else-if="challenge" class="px-4 flex flex-col flex-1 pt-4 pb-8">
      <div>{{ challenge.title }}</div>
      <div>{{ challenge.points }}</div>
      <div>{{ challenge.status }}</div>
      <div v-if="userProfileBasic.id === challenge.inviterId">{{ challenge.invitee?.name }}</div>
      <div v-else>{{ challenge.inviter?.name }}</div>
      <div>{{ challenge.inviteLink }}</div>
      <div>updatedOn: {{ updatedOn }}</div>
      <div>createdOn: {{ createdOn }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import { useStore } from '../composables/useStore';
  import { computed, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Challenge } from '../types';
  import dayjs from 'dayjs';
  import 'dayjs/locale/pl';
  import 'dayjs/locale/en-gb';
  import { useFirebase } from '../useFirebase';
  dayjs.locale(navigator.language);

  const { challenges, getChallenges } = useStore();
  const { currentRoute } = useRouter();
  const loading = ref(false);
  const { userProfileBasic } = useFirebase();

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
</script>
