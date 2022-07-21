<template>
  <div class="flex flex-col items-center justify-center px-6">
    <h2 class="text-2xl dark:text-white-10">
      {{ $t('onboarding.finishProfileHeading') }}
    </h2>
    <div class="mt-6 text-center px-10 dark:text-white-20">
      {{ $t('onboarding.finishProfileDescription') }}
    </div>
    <BaseInput class="w-full mt-6" v-model="name" placeholder="Name*" full required :error="formInvalid && !name" />
    <div class="relative w-full mt-6">
      <div class="absolute top-3 right-3">
        <BaseTooltip
          content="We ask for a nickname to distinguish you over other people who might have the same name. We don't require surname."
        >
          <BaseQuestionMark />
        </BaseTooltip>
      </div>
      <BaseInput
        class="w-full"
        v-model="nickname"
        placeholder="Nickname*"
        full
        required
        :error="formInvalid && !nickname"
      />
    </div>
    <BaseInput class="w-full mt-3" v-model="surname" placeholder="Surname" full />

    <!-- TODO only for iOS -->
    <BaseCheckbox
      class="mt-5"
      v-model="allowEmails"
      label="Send me email notifications for most
important actions in the app
(challenge invitation, challenge finish)."
    />
    <BaseButton class="mt-8" primary full @click="updateProfile">
      {{ loading ? $t('common.loading') : $t('onboarding.finishProfile') }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  import BaseInput from '../BaseInput.vue';
  import BaseButton from '../BaseButton.vue';
  import BaseCheckbox from '../BaseCheckbox.vue';
  import BaseTooltip from '../BaseTooltip.vue';
  import BaseQuestionMark from '../BaseQuestionMark.vue';

  const name = ref('');
  const nickname = ref('');
  const surname = ref('');
  const allowEmails = ref(false);
  const formInvalid = ref(false);

  // add photo
  const fullName = computed(() => `${name.value}${surname.value ? ` ${surname.value}` : ''}`);

  defineProps<{
    loading: boolean;
  }>();

  const invalidateForm = () => {
    formInvalid.value = true;
  };

  const emit = defineEmits(['updateProfile']);

  const updateProfile = () => {
    if (!name.value || !nickname.value) {
      invalidateForm();
      return;
    }

    emit('updateProfile', { name: fullName.value, nickname: nickname.value, allowEmails: allowEmails.value });
  };
</script>

<!--.then(function () { user.updateProfile({ displayName: displayName, photoURL: photoURL }); })-->
