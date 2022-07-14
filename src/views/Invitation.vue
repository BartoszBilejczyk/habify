<template>
  <div v-if="challenge.id" class="w-full h-full flex flex-col flex-1">
    <BaseTopNav :title="$t('titles.newChallenge')" back-route="home" background />
    <div class="px-4 py-2 w-full h-full flex-1 flex flex-col justify-center bg-primary dark:bg-dark-900 text-white">
      <h1 class="text-2xl text-center text-white">{{ $t('invite.challengedBy') }}{{ challenge.inviter?.name }}!</h1>
      <div class="mt-8 text-sm text-center">
        {{ $t('invite.inviteDescription') }}
      </div>
      <div class="mt-8 flex flex-col items-center">
        <ChallengeDetails class="w-full" on-dark :data="challenge" invite-key="inviter" />
        <div class="mt-8 flex flex-col items-center w-full px-6">
          <BaseSlideButton
            :done-text="$t('invite.accepted')"
            :slide-text="$t('invite.accept')"
            on-dark
            @success="handleAccept"
          />
          <!--          <div v-if="!done" class="my-2">or</div>-->
          <!--          <BaseButton v-if="!done" text-white>Propose changes</BaseButton>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  // import BaseButton from '../components/BaseButton.vue';
  import BaseSlideButton from '../components/BaseSlideButton.vue';
  import ChallengeDetails from '../components/ChallengeDetails.vue';
  import { onMounted, ref } from 'vue';
  import { useFirebase } from '../useFirebase';
  import { useRouter } from 'vue-router';
  import { Challenge, ChallengeBasic } from '../types';
  import { emptyChallenge } from '../helpers/empty';
  import { useI18n } from 'vue-i18n';

  const challenge = ref<Challenge>({ ...emptyChallenge });
  const { updateDoc, getDoc, userProfile, userProfileBasic } = useFirebase();
  const { push, currentRoute } = useRouter();
  const { t } = useI18n();

  const done = ref(false);

  onMounted(async () => {
    // do IF, if query invite not there
    const fetchedChallenge = (await getDoc(`challenges/${currentRoute.value.query.code}`)) as Challenge;

    if (fetchedChallenge.inviteeId === userProfile.value.id) {
      challenge.value = fetchedChallenge;
    } else {
      alert(t('invite.notInvitedUser'));
    }
  });

  // const image = computed(() => {
  //   return new URL('../assets/auth-start.png', import.meta.url);
  // });

  const handleAccept = async () => {
    done.value = true;

    await updateDoc(`challenges/${challenge.value.id}`, {
      invitee: userProfileBasic.value,
      inviteeId: userProfileBasic.value.id,
      status: 'active',
      updatedOn: Date.now(),
      acceptedOn: Date.now(),
    });

    const newChallengesArray: ChallengeBasic[] = [
      ...userProfile.value.challenges,
      {
        id: challenge.value.id,
        points: challenge.value.points,
        title: challenge.value.title,
      },
    ];

    await updateDoc(`users/${userProfileBasic.value.id}`, {
      challenges: newChallengesArray,
    });

    await push({ name: 'active-challenges' });
    // TODO move to proper challenge and send new notification
  };
</script>
