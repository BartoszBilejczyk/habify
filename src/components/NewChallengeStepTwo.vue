<template>
  <div class="">
    <div class="text-white-900 dark:text-white mb-10">Dodac jakis box o co chodzi</div>
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
  </div>
</template>

<script setup lang="ts">
  import BaseSection from '../components/BaseSection.vue';
  import BaseSelect from '../components/BaseSelect.vue';
  import { onMounted, ref } from 'vue';
  import BaseTextarea from './BaseTextarea.vue';
  import { useStore } from '../composables/useStore';
  import { customAlphabet } from 'nanoid';
  import { useI18n } from 'vue-i18n';
  import { BET_CATEGORY } from '../helpers/constants';

  const { stepOne } = useStore();
  const { t } = useI18n();

  onMounted(() => {
    stepOne.id = customAlphabet('abcdefghijklmnoprstuvwyz1234567890', 10)();
  });

  const betCategoryOptions = ref([
    { label: BET_CATEGORY.social.label, value: BET_CATEGORY.social.value },
    { label: BET_CATEGORY.financial.label, value: BET_CATEGORY.financial.value },
    { label: BET_CATEGORY.sport.label, value: BET_CATEGORY.sport.value },
    { label: BET_CATEGORY.other.label, value: BET_CATEGORY.other.value },
  ]);
</script>
