<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav title="New Challenge" />
    <div class="px-4">
      <NewChallengeMenu class="mt-3 mb-5" :has-friends="hasFriends" :step="step" />
      <NewChallengeStepOne v-show="step === 'basics'" />
      <NewChallengeStepTwo v-show="step === 'invite'" />
      <NewChallengeStepThree v-show="step === 'confirm'" />
      <NewChallengeButtons
        class="mt-3"
        :step="step"
        @next="handleNext"
        @prev="handlePrev"
        @finish="handleFinish"
        :done="done"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { nanoid } from 'nanoid';

  import BaseTopNav from '../components/BaseTopNav.vue';
  import NewChallengeStepOne from '../components/NewChallengeStepOne.vue';
  import NewChallengeStepTwo from '../components/NewChallengeStepTwo.vue';
  import NewChallengeStepThree from '../components/NewChallengeStepThree.vue';
  import NewChallengeMenu from '../components/NewChallengeMenu.vue';
  import NewChallengeButtons from '../components/NewChallengeButtons.vue';
  import { useFirebase } from '../useFirebase';
  import { Challenge, ChallengeCreateStep } from '../types';
  import { emptyChallenge } from '../helpers/empty';
  import { useStore } from '../composables/useStore';

  const { userProfile, firebaseUser, test, users } = useFirebase();
  const { stepOne } = useStore();

  const hasFriends = computed(() => Boolean(userProfile.value.friends.length));

  const step = ref<ChallengeCreateStep>('basics');
  const done = ref(false);

  const handleNext = () => {
    if (step.value === 'basics') {
      step.value = hasFriends ? 'confirm' : 'invite';
    }

    if (step.value === 'invite') {
      step.value = 'confirm';
    }
  };
  const handlePrev = () => {
    if (step.value === 'confirm') {
      step.value = hasFriends ? 'invite' : 'basics';
    }

    if (step.value === 'invite') {
      step.value = 'basics';
    }
  };

  const handleFinish = () => {
    const challenge: Challenge = {
      ...emptyChallenge,
      ...stepOne,
      status: 'waitsForConfirm',
      confirmationType: 'manual',
      points: 500,
      id: nanoid(),
      inviterId: firebaseUser.value?.uid,
      // inviter: get user from users (keep a separate composable for it during load).
      // inviteLink: do some generation through jwt?
    };

    done.value = true;
    console.log(challenge);
  };
</script>
