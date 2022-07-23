<template>
  <div
    class="flex flex-col flex-1 relative px-4 justify-center"
    :class="{ 'py-16': isStandalone, 'pb-16': !isStandalone }"
  >
    <!--    <LottieAnimation-->
    <!--      :animation-data="confettiAnimation"-->
    <!--      :height="lottieHeight"-->
    <!--      v-if="!showPaperPlane"-->
    <!--      class="absolute left-1/2 -translate-x-1/2"-->
    <!--      :class="{ '-top-16 ': isStandalone, 'top-9': !isStandalone }"-->
    <!--    />-->
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
      <div class="flex flex-col items-center mt-4 mb-10">
        <div v-if="copied" class="text-sm font-bold text-white">{{ $t('profile.copied') }}</div>
        <BaseButton class="mt-2" v-else text-white @click="copy(inviteLink)">{{ $t('profile.copyLink') }}</BaseButton>
        <BaseButton class="mt-6" outline-white @click="share">{{ $t('common.shareLink') }}</BaseButton>
      </div>
    </div>
    <BaseButton text-white class="mt-6" @click="handleBackToChallenge">{{ $t('challenge.goToChallenge') }}</BaseButton>
  </div>
</template>

<script setup lang="ts">
  import BaseInfoToCopy from '../components/BaseInfoToCopy.vue';
  import BaseButton from '../components/BaseButton.vue';
  import { useClipboard } from '@vueuse/core';
  import { useUser } from '../composables/useUser';
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import checkAnimation from '../assets/lottie/check-animation.json';
  import paperplaneAnimation from '../assets/lottie/paperplane-animation.json';

  const { copy, copied } = useClipboard();
  const { userProfile } = useUser();
  const { t } = useI18n();
  const { push, replace, currentRoute } = useRouter();

  const showPaperPlane = ref(false);

  const inviteLink = computed(() => `https://habbi.app/invite?inviteCode=${currentRoute.value.query.id}`);

  const shareData = computed(() => ({
    title: inviteLink.value,
    // title: `${t('invite.accept')}!`,
    text: inviteLink.value,
    // text: `${t('invite.accept')}!`,
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
      return '35vh';
    } else {
      return '30vh';
    }
  });

  const handleBackToChallenge = async () => {
    // @ts-ignore
    await push({ name: 'challenge', params: { id: currentRoute.value.query.id } });
  };
</script>
