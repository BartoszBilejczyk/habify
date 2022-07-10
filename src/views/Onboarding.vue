<template>
  <div class="w-full flex-1 flex flex-col">
    <div class="flex-1 flex flex-col items-center justify-center">
      <OnboardingFinishProfile v-if="step === 1" @update-profile="updateProfile" />
      <OnboardingBase
        v-if="step === 2"
        :step="step"
        class="bg-primary"
        title="Onboarding 1"
        description="Lorem ipsum dolor sit amet sdajl qoipasncvusqad jasdklj"
        @next="handleNext"
        @skip="handleSkip"
      />
      <OnboardingBase
        v-if="step === 3"
        :step="step"
        class="bg-green"
        title="Onboarding 2"
        description="Lorem ipsum dolor sit amet sdajl qoipasncvusqad jasdklj"
        @next="handleNext"
        @skip="handleSkip"
      />
      <OnboardingBase
        v-if="step === 4"
        :step="step"
        class="bg-coral"
        title="Onboarding 3"
        description="Lorem ipsum dolor sit amet sdajl qoipasncvusqad jasdklj"
        @finish="handleFinish"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import OnboardingFinishProfile from '../components/onboarding/OnboardingFinishProfile.vue';
  import OnboardingBase from '../components/onboarding/OnboardingBase.vue';
  import { useFirebase } from '../useFirebase';
  import firebase from 'firebase';
  import { User } from '../types';
  import { useRouter } from 'vue-router';
  import { useStore } from '../composables/useStore';

  const { firebaseUser, updateDoc, getDoc, userProfile } = useFirebase();
  const { push, replace, currentRoute } = useRouter();

  const step = ref(1);
  const { referrer } = useStore();

  const handleNext = () => {
    replace({ query: { ...currentRoute.value.query, step: String(step.value + 1) } });
    step.value++;
  };

  const handleSetInitialQuery = () => {
    replace({ query: { ...currentRoute.value.query, step: String(step.value) } });
  };

  const handleSkip = async () => {
    await push({ name: 'home' });
  };

  const handleFinish = async () => {
    setTimeout(async () => {
      await updateDoc(`users/${firebaseUser.value?.uid}`, { onboarded: true });
      await push({ name: 'home' });
    }, 800);
  };

  onMounted(async () => {
    const user = firebase.auth().currentUser;

    if (user) {
      const userDoc: Partial<User> = await getDoc(`users/${user?.uid}`);

      if (userDoc.profileFinished) {
        step.value = 2;
      }

      if (userDoc.onboarded) {
        await push({ name: 'home', query: {} });
      }

      handleSetInitialQuery();
    }
  });

  const updateProfile = async ({ name, allowEmails }: { name: string; allowEmails: boolean }) => {
    if (!firebaseUser.value) {
      return;
    }

    await firebaseUser.value.updateProfile({ displayName: name }).catch(err => console.error(err));

    if (referrer.value.id) {
      await updateDoc(`users/${firebaseUser.value?.uid}`, {
        name,
        allowEmails,
        profileFinished: true,
        friends: [
          {
            id: referrer.value.id,
            name: referrer.value.name,
          },
        ],
      });
    } else {
      await updateDoc(`users/${firebaseUser.value?.uid}`, { name, allowEmails, profileFinished: true });
    }

    // TODO refactor to be safer and better and have new user's name. Move finish profile to here, from onboarding
    if (referrer.value.id) {
      await updateDoc(`users/${referrer.value.id}`, {
        friends: [
          ...referrer.value.friends,
          {
            id: userProfile.value.id,
            name,
          },
        ],
      });
    }

    userProfile.value = {
      ...userProfile.value,
      ...{ name, allowEmails, profileFinished: true },
    };

    handleNext();
  };
</script>
