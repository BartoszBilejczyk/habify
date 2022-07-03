<template>
  <div class="w-full flex-1 flex flex-col">
    <div v-if="loading">Loading</div>
    <div v-else class="flex-1 flex flex-col items-center justify-center">
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
        class="bg-blue"
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
  import useFirebase from '../use-firebase';
  import firebase from 'firebase';
  import { User } from '../types';
  import { useRouter } from 'vue-router';

  const { getCurrentUser, updateDoc, getDoc } = useFirebase();
  const { push } = useRouter();

  const step = ref(1);
  const loading = ref(true);

  const handleNext = () => {
    step.value++;
  };
  const handleSkip = async () => {
    await push({ name: 'home' });
  };

  const handleFinish = async () => {
    console.log(getCurrentUser());
    const user = getCurrentUser();

    console.log('finish');
    await updateDoc(`users/${user?.uid}`, { onboarded: true });
    await push({ name: 'home' });
  };

  onMounted(async () => {
    // show loading state
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const userDoc: Partial<User> = await getDoc(`users/${user?.uid}`);

        if (userDoc.profileFinished) {
          step.value = 2;
        }

        if (userDoc.onboarded) {
          await push({ name: 'home' });
        }
      }
      loading.value = false;
    });
  });

  const updateProfile = async ({ name, allowEmails }: { name: string; allowEmails: boolean }) => {
    const user = getCurrentUser();
    await user
      ?.updateProfile({
        displayName: name,
      })
      .catch(err => console.error(err));
    await updateDoc(`users/${user?.uid}`, { name, allowEmails, profileFinished: true });
    step.value++;
  };
</script>
