<template>
  <div class="flex flex-col flex-1 relative pt-32 px-4 justify-center" :class="isStandalone ? 'pt-32' : 'pt-24'">
    <LottieAnimation
      :animation-data="confettiAnimation"
      :height="lottieHeight"
      v-if="!showPaperPlane"
      class="absolute left-1/2 -translate-x-1/2"
      :class="isStandalone ? '-top-8' : 'top-9'"
    />
    <LottieAnimation
      v-if="!showPaperPlane"
      :loop="false"
      :animation-data="checkAnimation"
      :height="lottieHeight"
      @onComplete="showPaperPlane = true"
    />
    <LottieAnimation v-if="showPaperPlane" :animation-data="paperplaneAnimation" :height="lottieHeight" />
    <div>
      <h1 class="text-2xl text-center text-white-10 mb-6">{{ $t('common.share') }}</h1>
      <BaseInfoToCopy on-dark>{{ inviteLink }}</BaseInfoToCopy>
      <div class="flex justify-center mt-6 mb-10">
        <BaseButton outline-white @click="share">{{ $t('common.shareLink') }}</BaseButton>
      </div>
    </div>
    <BaseButton text-white class="mt-6" @click="handleBackToChallenge">{{ $t('challenge.goToChallenge') }}</BaseButton>
  </div>
</template>

<script setup lang="ts">
  import BaseSection from '../components/BaseSection.vue';
  import BaseInfoToCopy from '../components/BaseInfoToCopy.vue';
  import BaseButton from '../components/BaseButton.vue';
  import { useStore } from '../composables/useStore';
  import { useClipboard } from '@vueuse/core';
  import { useFirebase } from '../useFirebase';
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import checkAnimation from '../assets/lottie/check-animation.json';
  import paperplaneAnimation from '../assets/lottie/paperplane-animation.json';
  import confettiAnimation from '../assets/lottie/confetti-animation.json';
  import doneAnimation from '../assets/lottie/done-animation.json';

  const { copy, copied } = useClipboard();
  const { userProfile } = useFirebase();
  const { t } = useI18n();
  const { push, replace, currentRoute } = useRouter();

  const showPaperPlane = ref(false);

  const inviteLink = computed(() => `https://habbi.app/invite?code=${currentRoute.value.query.id}`);

  const shareData = computed(() => ({
    title: `${t('invite.accept')}!`,
    text: `${t('invite.accept')}!`,
    url: inviteLink.value,
  }));

  const share = () => {
    if (navigator.share) {
      navigator.share(shareData.value);
    } else {
      copy(inviteLink.value);
    }
  };

  const isStandalone = computed(() => window.matchMedia('(display-mode: standalone)').matches);

  const lottieHeight = computed(() => {
    if (isStandalone.value) {
      return '30vh';
    } else {
      return '20vh';
    }
  });

  const handleBackToChallenge = () => {
    // @ts-ignore
    push({ name: 'challenge', params: { id: currentRoute.value.query.id } });
  };
</script>
