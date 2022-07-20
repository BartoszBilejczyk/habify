<template>
  <div class="w-full h-full flex flex-col flex-1 pb-6">
    <!--    TODO improve UX -->
    <BaseTopNav :title="$t('titles.new')" back-route="profile" />
    <div class="flex flex-col flex-1 mt-6 px-4 justify-between">
      <div>
        <!--        <NewChallengeMenu class="mt-3 mb-8" :has-friends="hasFriends" :step="step" />-->
        <!--       make new step - for bet -->
        <!--        <NewChallengeStepTwo v-show="step === 2" />-->
        <!--        <NewChallengeStepThree v-show="step === 3" :friends="friends" />-->
        <!--        <NewChallengeStepFour v-show="step === 4" />-->

        <BaseInput
          v-model="stepOne.title"
          class="mb-3"
          :label="$t('common.challenge')"
          :placeholder="$t('challenge.example')"
          :error="formInvalid && !stepOne.title"
          full
        />
        <BaseTextarea
          v-model="stepOne.betDetails"
          class="mb-3"
          :label="$t('common.bet')"
          :placeholder="$t('challenge.betDetails')"
          :error="formInvalid && !stepOne.betDetails"
          full
        />
        <div v-if="friends.length" class="flex flex-col items-center">
          <div class="text-center text-lg text-white-700 dark:text-white-10 mb-6">
            {{ stepOne.invitee?.name }} {{ stepOne.invitee?.nickname && `(${stepOne.invitee.nickname})` }}
          </div>
          <BaseButton v-if="stepOne.inviteeId" small primary @click="openChooseFriend">Change friend</BaseButton>
          <template v-else>
            <BaseButton small primary @click="openChooseFriend">Choose friend for challenge</BaseButton>
            <div class="text-center text-xs text-white-200 dark:text-white-30 mt-3 mb-4">
              {{ $t('challenge.chooseAfter') }}
            </div>
          </template>
        </div>
        <div v-else class="text-center text-xs text-white-200 dark:text-white-30 mt-10 mb-4">
          You can invite a new friend later with the invite link.
        </div>
      </div>

      <BaseSlideButton
        primary
        full
        :disabled="!stepOne.title || !stepOne.betDetails"
        @success="handleFinish"
        @validate="invlidateForm"
        :done-text="$t('challenge.challengeCreated')"
        :slide-text="$t('challenge.slideToStart')"
      />
    </div>

    <BaseModalFromBottom :is-open="isModalOpen" @hide="hideModal" :heading="$t('notifications.heading')">
      <BaseSection :title="$t('titles.challengeExistingFriends')">
        <!--  TODO add icon that friend has been selected-->
        <div
          v-for="friend in friends"
          :key="friend.id"
          class="bg-white-10 dark:bg-dark-800 my-3 py-1 px-3 rounded-lg cursor-pointer"
          :class="stepOne.inviteeId === friend.id && 'bg-primary-20 dark:bg-white-10 dark:text-white-500'"
          @click="handleChooseFriend(friend)"
        >
          {{ friend.name }} {{ friend.nickname && `(${friend.nickname})` }}
        </div>
      </BaseSection>
    </BaseModalFromBottom>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';

  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseInput from '../components/BaseInput.vue';
  import BaseModalFromBottom from '../components/BaseModalFromBottom.vue';
  import BaseSection from '../components/BaseSection.vue';
  import BaseTextarea from '../components/BaseTextarea.vue';
  import BaseButton from '../components/BaseButton.vue';
  import BaseSlideButton from '../components/BaseSlideButton.vue';
  import { useFirebase } from '../composables/useFirebase';
  import { Challenge, ChallengeBasic, Friend, Notification } from '../types';
  import { useStore } from '../composables/useStore';
  import { useRouter } from 'vue-router';
  import { useUser } from '../composables/useUser';
  import { NOTIFICATION_ACTION, NOTIFICATION_CATEGORY } from '../helpers/constants';
  import { emptyUserBasic } from '../helpers/empty';
  import { customAlphabet } from 'nanoid';

  const { firebaseUser, setDoc, updateDoc } = useFirebase();
  const { userProfile, userProfileBasic, addNotification } = useUser();
  const { newChallenge, inviteLink, stepOne } = useStore();

  const friends = computed(() => userProfile.value.friends);

  // const step = ref(1);
  const done = ref(false);
  const isModalOpen = ref(false);
  const formInvalid = ref(false);
  const { push } = useRouter();

  // const handleNext = () => {
  //   if (step.value === 2) {
  //     step.value = hasFriends.value ? 3 : 4;
  //   } else {
  //     step.value++;
  //   }
  // };
  // const handlePrev = () => {
  //   if (step.value === 4) {
  //     step.value = hasFriends.value ? 3 : 2;
  //   } else {
  //     step.value--;
  //   }
  // };

  onMounted(() => {
    stepOne.id = customAlphabet('abcdefghijklmnoprstuvwyz1234567890', 10)();
  });

  const hideModal = () => {
    isModalOpen.value = false;
  };

  const openChooseFriend = () => {
    isModalOpen.value = true;
  };

  const invlidateForm = () => {
    formInvalid.value = true;
  };

  const handleChooseFriend = (friend: Friend) => {
    stepOne.invitee = {
      ...emptyUserBasic,
      ...friend,
    };
    stepOne.inviteeId = friend.id;
    hideModal();
  };

  const handleFinish = async () => {
    if (!stepOne.title || !stepOne.betDetails) {
      return;
    }

    const challenge: Challenge = {
      ...newChallenge.value,
      createdOn: Date.now(),
      updatedOn: Date.now(),
      inviterId: firebaseUser.value?.uid,
      inviter: userProfileBasic.value,
      inviteLink: inviteLink.value,
    };

    await setDoc(`challenges/${newChallenge.value.id}`, challenge);

    const newChallengesArray: ChallengeBasic[] = [
      ...userProfile.value.challenges,
      { id: challenge.id, points: challenge.points, title: challenge.title },
    ];

    await updateDoc(`users/${userProfileBasic.value.id}`, {
      challenges: newChallengesArray,
    });

    if (stepOne.inviteeId) {
      console.log(stepOne.inviteeId);
      const notificationData: Partial<Notification> = {
        name: `You have been challenged by ${stepOne.invitee?.name}.`,
        // TODO update
        description: `Challenge is ${challenge.title} and bet is ${challenge.betDetails}.`,
        points: challenge.points,
        category: NOTIFICATION_CATEGORY.challenge.value,
        challengeId: challenge.id,
        actions: [
          NOTIFICATION_ACTION.showInvite.value,
          // NOTIFICATION_ACTION.acceptChallenge.value,
          // NOTIFICATION_ACTION.refuseChallenge.value,
        ],
      };

      await addNotification(notificationData, stepOne.inviteeId);
    }

    done.value = true;

    console.log(challenge);

    await push({ name: 'new-challenge-success', query: { id: newChallenge.value.id } });
  };
</script>
