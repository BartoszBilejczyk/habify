<template>
  <div class="">
    <BaseSection :title="$t('common.share')">
      <BaseInfoToCopy>{{ inviteLink }}</BaseInfoToCopy>
      <div class="flex justify-center mt-4 mb-10">
        <BaseButton outline-white @click="share">{{ $t('common.shareLink') }}</BaseButton>
      </div>
    </BaseSection>
  </div>
</template>

<script setup lang="ts">
  import BaseSection from './BaseSection.vue';
  import BaseInfoToCopy from './BaseInfoToCopy.vue';
  import BaseButton from './BaseButton.vue';
  import { useStore } from '../composables/useStore';
  import { useClipboard } from '@vueuse/core';
  import { useUser } from '../composables/useUser';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { copy, copied } = useClipboard();
  const { userProfile } = useUser();
  const { inviteLink } = useStore();
  const { t } = useI18n();

  const shareData = computed(() => ({
    // title: `${t('invite.accept')}!`,
    title: inviteLink.value,
    // text: `${t('invite.accept')}!`,
    text: inviteLink.value,
    url: inviteLink.value,
  }));

  const share = () => {
    if (navigator.share) {
      navigator.share(shareData.value);
    } else {
      copy(inviteLink.value);
    }
  };
</script>
