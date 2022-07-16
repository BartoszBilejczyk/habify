<template>
  <div class="">
    <BaseSection :title="$t('titles.confirmDetails')">
      <ChallengeDetails :data="newChallenge" invite-key="invitee" />
    </BaseSection>
    <div class="text-center text-xs text-white-200 dark:text-white-20 mb-8">{{ $t('challenge.shareOnNext') }}</div>
  </div>
</template>

<script setup lang="ts">
  import BaseSection from './BaseSection.vue';
  import ChallengeDetails from './ChallengeDetails.vue';
  import { useStore } from '../composables/useStore';
  import { useFirebase } from '../useFirebase';
  import { useI18n } from 'vue-i18n';

  const { userProfile } = useFirebase();
  const { newChallenge } = useStore();
  const { t } = useI18n();
</script>
