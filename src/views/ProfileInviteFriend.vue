<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav :title="$t('titles.inviteFriend')" back-route="profile" background />
    <div class="px-4 pt-4 w-full h-full flex-1 flex flex-col justify-center pb-20 bg-primary dark:bg-dark text-white">
      <div class="text-sm text-center">
        {{ $t('profile.inviteDescription') }}
      </div>
      <div class="flex flex-col items-center">
        <img :src="image" alt="Invite friend illustration" class="my-8 h-56" />
        <div
          @click="copy(userProfile.referralCode)"
          class="border-dashed border border-white p-4 rounded-xl w-48 text-center font-black"
        >
          {{ userProfile.referralCode }}
        </div>
        <div class="mt-8 flex flex-col items-center">
          <div v-if="copied" class="text-lg font-bold text-white">{{ $t('profile.copied') }}</div>
          <BaseButton v-else white @click="copy(url)">{{ $t('profile.copyReferralCode') }}</BaseButton>
          <BaseButton white @click="invite">{{ $t('common.invite') }}</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseButton from '../components/BaseButton.vue';
  import { computed } from 'vue';
  import { useClipboard } from '@vueuse/core';
  import { useFirebase } from '../useFirebase';
  import { useI18n } from 'vue-i18n';

  const { copy, copied } = useClipboard();
  const { userProfile } = useFirebase();
  const { t } = useI18n();

  const url = computed(() => `https://habbi.app/register?code=${userProfile.value.referralCode}`);

  const shareData = computed(() => ({
    title: `${t('profile.inviteShareTitle')}!`,
    text: `${t('profile.inviteShareDescription')}!`,
    url: url.value,
  }));

  const image = computed(() => {
    return new URL('../assets/auth-start.png', import.meta.url);
  });

  const invite = () => {
    if (navigator.share) {
      navigator.share(shareData.value);
    } else {
      copy(url.value);
    }
  };
</script>
