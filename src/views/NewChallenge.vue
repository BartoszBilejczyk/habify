<template>
  <div class="w-full h-full flex flex-col flex-1 pb-6">
    <!--    TODO improve UX -->
    <BaseTopNav :title="$t('titles.new')" back-route="profile" />
    <div class="flex flex-col flex-1 px-4 pb-12 justify-between">
      <div>
        <NewChallengeMenu class="mt-3 mb-8" :has-friends="hasFriends" :step="step" />
        <NewChallengeStepOne v-show="step === 1" />
        <!--       make new step - for bet -->
        <NewChallengeStepTwo v-show="step === 2" />
        <NewChallengeStepThree v-show="step === 3" :friends="friends" />
        <NewChallengeStepFour v-show="step === 4" />
      </div>
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

  import BaseTopNav from '../components/BaseTopNav.vue';
  import NewChallengeStepOne from '../components/NewChallengeStepOne.vue';
  import NewChallengeStepTwo from '../components/NewChallengeStepTwo.vue';
  import NewChallengeStepThree from '../components/NewChallengeStepThree.vue';
  import NewChallengeStepFour from '../components/NewChallengeStepFour.vue';
  import NewChallengeMenu from '../components/NewChallengeMenu.vue';
  import NewChallengeButtons from '../components/NewChallengeButtons.vue';
  import { useFirebase } from '../composables/useFirebase';
  import { Challenge, ChallengeBasic } from '../types';
  import { useStore } from '../composables/useStore';
  import { useRouter } from 'vue-router';
  import { useUser } from '../composables/useUser';

  const { firebaseUser, setDoc, updateDoc } = useFirebase();
  const { userProfile, userProfileBasic } = useUser();
  const { newChallenge, inviteLink } = useStore();

  const friends = computed(() => userProfile.value.friends);
  const hasFriends = computed(() => Boolean(friends.value.length));

  const step = ref(1);
  const done = ref(false);
  const { push } = useRouter();

  const handleNext = () => {
    if (step.value === 2) {
      step.value = hasFriends.value ? 3 : 4;
    } else {
      step.value++;
    }
  };
  const handlePrev = () => {
    if (step.value === 4) {
      step.value = hasFriends.value ? 3 : 2;
    } else {
      step.value--;
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

    await push({ name: 'new-challenge-success', query: { id: newChallenge.value.id } });
  };
</script>
