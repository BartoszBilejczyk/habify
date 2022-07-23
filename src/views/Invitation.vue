<template>
  <div v-if="challenge.id" class="w-full h-full flex flex-col flex-1">
    <BaseTopNav
      :title="$t('titles.invitation')"
      back-route="active-challenges"
      background
      :icon="Boolean(userProfile?.id) ? 'back' : null"
    />
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
    <BaseModalFromBottom :is-open="isModalOpen" @hide="hideModal">
      <LoginContent @onLogin="handleBackFromLogin" />
    </BaseModalFromBottom>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  // import BaseButton from '../components/BaseButton.vue';
  import BaseSlideButton from '../components/BaseSlideButton.vue';
  import ChallengeDetails from '../components/ChallengeDetails.vue';
  import LoginContent from '../components/LoginContent.vue';
  import BaseModalFromBottom from '../components/BaseModalFromBottom.vue';

  import { onMounted, ref } from 'vue';
  import { useFirebase } from '../composables/useFirebase';
  import { useRouter } from 'vue-router';
  import { Challenge, ChallengeBasic, Notification } from '../types';
  import { emptyChallenge } from '../helpers/empty';
  import { useI18n } from 'vue-i18n';
  import { useUser } from '../composables/useUser';
  import { NOTIFICATION_CATEGORY, NOTIFICATION_ACTION } from '../helpers/constants';

  const challenge = ref<Challenge>({ ...emptyChallenge });
  const { updateDoc, getDoc } = useFirebase();
  const { userProfile, userProfileBasic, addNotification } = useUser();
  const { push, currentRoute, replace } = useRouter();
  const { t } = useI18n();

  const isModalOpen = ref(false);
  const done = ref(false);

  onMounted(async () => {
    // do IF, if query invite not there
    const fetchedChallenge = (await getDoc(`challenges/${currentRoute.value.query.inviteCode}`)) as Challenge;

    if (userProfile.value.id && currentRoute.value.query.backToInvite) {
      await handleBackFromLogin();
    }

    if (fetchedChallenge.inviteeId && userProfile.value.id && fetchedChallenge.inviteeId !== userProfile.value.id) {
      alert(t('invite.notInvitedUser'));
    } else if (
      !fetchedChallenge.inviteeId ||
      fetchedChallenge.inviteeId === userProfile.value.id ||
      !userProfile.value?.id
    ) {
      challenge.value = fetchedChallenge;

      if (!userProfile.value?.id) {
        setTimeout(async () => {
          openModal();
          // add notification so that user can come back to the invitation
          // @ts-ignore
          await replace({ query: { ...currentRoute.value.query, backToInvite: challenge.value.id } });
        }, 500);
      }
    }
  });

  const hideModal = async () => {
    isModalOpen.value = false;

    if (currentRoute.value.query?.backToInvite) {
      const query = { ...currentRoute.value.query };
      delete query.backToInvite;
      await replace({ query });
    }
  };

  const openModal = () => {
    isModalOpen.value = true;
  };

  const handleBackFromLogin = async () => {
    const notificationData: Partial<Notification> = {
      name: `You have been challenged by ${challenge.value.inviter?.name}.`,
      // TODO update
      description: `Challenge is ${challenge.value.title} and bet is ${challenge.value.betDetails}.`,
      points: challenge.value.points,
      category: NOTIFICATION_CATEGORY.challenge.value,
      challengeId: challenge.value.id,
      actions: [
        NOTIFICATION_ACTION.showInvite.value,
        // NOTIFICATION_ACTION.acceptChallenge.value,
        // NOTIFICATION_ACTION.refuseChallenge.value,
      ],
    };

    await addNotification(notificationData, challenge.value.inviteeId);

    await hideModal();
  };

  const handleAccept = async () => {
    // TODO handle login/register on modal for users who are not logged in

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

    await addNotification(
      {
        name: `${userProfileBasic.value.name} accepted "${challenge.value.title}" challenge`,
        description: '',
        points: 0,
        category: NOTIFICATION_CATEGORY.challenge.value,
        challengeId: challenge.value.id,
        actions: [NOTIFICATION_ACTION.goToChallenge.value],
      },
      challenge.value?.inviterId
    );

    await push({ name: 'challenge', params: { id: challenge.value.id } });
  };
</script>
