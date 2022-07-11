<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav title="New Challenge" />
    <div class="px-4">
      <NewChallengeMenu class="mt-3 mb-5" :has-friends="hasFriends" :step="step" />
      <NewChallengeStepOne v-show="step === 'basics'" />
      <NewChallengeStepTwo v-show="step === 'invite'" :friends="friends" />
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
  import { customAlphabet } from 'nanoid';

  import BaseTopNav from '../components/BaseTopNav.vue';
  import NewChallengeStepOne from '../components/NewChallengeStepOne.vue';
  import NewChallengeStepTwo from '../components/NewChallengeStepTwo.vue';
  import NewChallengeStepThree from '../components/NewChallengeStepThree.vue';
  import NewChallengeMenu from '../components/NewChallengeMenu.vue';
  import NewChallengeButtons from '../components/NewChallengeButtons.vue';
  import { useFirebase } from '../useFirebase';
  import { Challenge, ChallengeBasic, ChallengeCreateStep } from '../types';
  import { useStore } from '../composables/useStore';

  const { userProfile, userProfileBasic, firebaseUser, setDoc, updateDoc } = useFirebase();
  const { newChallenge, inviteLink } = useStore();

  const friends = computed(() => userProfile.value.friends);
  const hasFriends = computed(() => Boolean(friends.value.length));

  const step = ref<ChallengeCreateStep>('basics');
  const done = ref(false);

  const handleNext = () => {
    if (step.value === 'basics') {
      step.value = hasFriends.value ? 'invite' : 'confirm';
    } else if (step.value === 'invite') {
      step.value = 'confirm';
    }
  };
  const handlePrev = () => {
    if (step.value === 'confirm') {
      step.value = hasFriends.value ? 'invite' : 'basics';
    } else if (step.value === 'invite') {
      step.value = 'basics';
    }
  };

  const handleFinish = async () => {
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

    done.value = true;
    console.log(challenge);
  };
</script>
