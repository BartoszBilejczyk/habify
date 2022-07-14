<template>
  <div class="">
    <BaseSection :title="$t('common.challenge')">
      <BaseInput
        v-model="stepOne.title"
        class="mb-3"
        :placeholder="$t('challenge.example')"
        :label="$t('common.challenge')"
        full
      />
      <BaseSelect
        v-model="stepOne.type"
        class="mb-3"
        :placeholder="$t('common.type')"
        :label="$t('common.type')"
        full
        :options="typeOptions"
      />
      <BaseSelect
        v-if="stepOne.type === CHALLENGE_TYPES.duration.value"
        v-model="stepOne.duration"
        class="mb-3"
        :placeholder="$t('common.duration')"
        :label="$t('common.duration')"
        full
        :options="durationOptions"
      />
    </BaseSection>
    <BaseSection :title="$t('common.bet')">
      <BaseSelect
        v-model="stepOne.betCategory"
        class="mb-3"
        :placeholder="$t('common.category')"
        :label="$t('common.category')"
        full
        :options="betCategoryOptions"
      />
      <BaseTextarea
        v-model="stepOne.betDetails"
        class="mb-3"
        :placeholder="$t('common.details')"
        :label="$t('common.details')"
        full
      />
    </BaseSection>
  </div>
</template>

<script setup lang="ts">
  import BaseSection from '../components/BaseSection.vue';
  import BaseInput from '../components/BaseInput.vue';
  import BaseSelect from '../components/BaseSelect.vue';
  import { onMounted, ref } from 'vue';
  import BaseTextarea from './BaseTextarea.vue';
  import { useStore } from '../composables/useStore';
  import { customAlphabet } from 'nanoid';
  import { useI18n } from 'vue-i18n';
  import { BET_CATEGORY, CHALLENGE_TYPES } from '../helpers/constants';

  const { stepOne } = useStore();
  const { t } = useI18n();

  onMounted(() => {
    stepOne.id = customAlphabet('abcdefghijklmnoprstuvwyz1234567890', 10)();
  });

  const typeOptions = ref([
    { label: CHALLENGE_TYPES.oneTime.value, value: CHALLENGE_TYPES.oneTime.value },
    { label: CHALLENGE_TYPES.duration.value, value: CHALLENGE_TYPES.duration.value },
  ]);

  const durationOptions = ref(
    Array.from({ length: 30 }, (v, i) => ({ label: `${i + 1} ${t('common.days')}`, value: i + 1 }))
  );

  const betCategoryOptions = ref([
    { label: BET_CATEGORY.social.value, value: BET_CATEGORY.social.value },
    { label: BET_CATEGORY.financial.value, value: BET_CATEGORY.financial.value },
    { label: BET_CATEGORY.sport.value, value: BET_CATEGORY.sport.value },
    { label: BET_CATEGORY.other.value, value: BET_CATEGORY.other.value },
  ]);
</script>
