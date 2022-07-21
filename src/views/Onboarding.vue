<template>
  <div class="w-full flex-1 flex flex-col">
    <div class="flex-1 flex flex-col items-center justify-center">
      <OnboardingFinishProfile v-if="step === 1" @update-profile="updateProfile" :loading="finishProfileLoading" />
      <OnboardingBase
        v-if="step === 2"
        :step="step"
        class="bg-primary"
        :title="$t('titles.onboardingOne')"
        description="Lorem ipsum dolor sit amet sdajl qoipasncvusqad jasdklj"
        @next="handleNext"
        @skip="handleSkip"
      >
        <LottieAnimation :animation-data="manPhoneAnimation" :height="lottieHeight" />
      </OnboardingBase>
      <OnboardingBase
        v-if="step === 3"
        :step="step"
        class="bg-primary"
        :title="$t('titles.onboardingTwo')"
        description="Lorem ipsum dolor sit amet sdajl qoipasncvusqad jasdklj"
        @next="handleNext"
        @skip="handleSkip"
      >
        <LottieAnimation :animation-data="betAnimation" :height="lottieHeight" />
      </OnboardingBase>
      <OnboardingBase
        v-if="step === 4"
        :step="step"
        class="bg-white"
        :white="true"
        :title="$t('titles.onboardingTwo')"
        description="Lorem ipsum dolor sit amet sdajl qoipasncvusqad jasdklj"
        @next="handleNext"
        @skip="handleSkip"
      >
        <LottieAnimation :animation-data="girlChinupAnimation" :height="lottieHeight" />
      </OnboardingBase>
      <OnboardingBase
        v-if="step === 5"
        :step="step"
        class="bg-green"
        :title="$t('titles.onboardingThree')"
        description="Lorem ipsum dolor sit amet sdajl qoipasncvusqad jasdklj"
        @finish="handleFinish"
      >
        <LottieAnimation :animation-data="earthAnimation" :height="lottieHeight" />
      </OnboardingBase>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import OnboardingFinishProfile from '../components/onboarding/OnboardingFinishProfile.vue';
  import OnboardingBase from '../components/onboarding/OnboardingBase.vue';
  import { useFirebase } from '../composables/useFirebase';
  import firebase from 'firebase';
  import { User } from '../types';
  import { useRouter } from 'vue-router';
  import { useStore } from '../composables/useStore';
  import betAnimation from '../assets/lottie/bet-animation.json';
  import earthAnimation from '../assets/lottie/earth-animation.json';
  import girlChinupAnimation from '../assets/lottie/girl-chinup-animation.json';
  import manPhoneAnimation from '../assets/lottie/man-phone-animation.json';
  import { useUser } from '../composables/useUser';
  import { NOTIFICATION_CATEGORY } from '../helpers/constants';

  const { firebaseUser, updateDoc, getDoc } = useFirebase();
  const { userProfile, addNotification } = useUser();
  const { push, replace, currentRoute } = useRouter();

  const loading = ref(false);
  const finishProfileLoading = ref(false);
  const step = ref(1);
  const { referrer } = useStore();

  const lottieHeight = computed(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return '40vh';
    } else {
      return '35vh';
    }
  });

  const handleNext = () => {
    replace({ query: { ...currentRoute.value.query, step: String(step.value + 1) } });
    step.value++;
  };

  const handleSetInitialQuery = () => {
    replace({ query: { ...currentRoute.value.query, step: String(step.value) } });
  };

  const handleSkip = async () => {
    await push({ name: 'active-challenges' });
  };

  const handleFinish = async () => {
    setTimeout(async () => {
      await updateDoc(`users/${firebaseUser.value?.uid}`, { onboarded: true });
      await push({ name: 'active-challenges' });
    }, 800);
  };

  onMounted(async () => {
    loading.value = true;
    const user = firebase.auth().currentUser;

    if (user) {
      const userDoc: Partial<User> = await getDoc(`users/${user?.uid}`);

      if (userDoc.profileFinished) {
        step.value = 2;
      }

      if (userDoc.onboarded) {
        loading.value = false;
        await push({ name: 'active-challenges', query: {} });
      }

      handleSetInitialQuery();
    }

    loading.value = false;
  });

  const updateProfile = async (data: { name: string; nickname: string; allowEmails: boolean }) => {
    if (!firebaseUser.value) {
      return;
    }
    finishProfileLoading.value = true;

    await firebaseUser.value.updateProfile({ displayName: data.name }).catch(err => console.error(err));

    if (referrer.value.id) {
      await updateDoc(`users/${firebaseUser.value?.uid}`, {
        ...data,
        profileFinished: true,
        friends: [
          {
            id: referrer.value.id,
            name: referrer.value.name,
          },
        ],
      });

      await addNotification(
        {
          name: `${data.name} ${data.nickname && `(${data.nickname})`} accepted your invitation to Habbi.`,
          description: '',
          points: 0,
          category: NOTIFICATION_CATEGORY.friends.value,
          challengeId: '',
        },
        referrer.value?.id
      );
    } else {
      await updateDoc(`users/${firebaseUser.value?.uid}`, { ...data, profileFinished: true });
    }

    // TODO refactor to be safer and better and have new user's name. Move finish profile to here, from onboarding
    if (referrer.value.id) {
      await updateDoc(`users/${referrer.value.id}`, {
        friends: [
          ...referrer.value.friends,
          {
            id: userProfile.value.id,
            name: data.name,
            nickname: data.nickname,
          },
        ],
      });
    }

    userProfile.value = {
      ...userProfile.value,
      ...{ ...data, profileFinished: true },
    };

    finishProfileLoading.value = false;
    handleNext();
  };
</script>
