<template>
  <div class="mt-4 mb-8">
    <!--    <BaseSelect-->
    <!--      v-model="stepOne.type"-->
    <!--      class="mb-3"-->
    <!--      :placeholder="$t('common.type')"-->
    <!--      :label="$t('common.type')"-->
    <!--      full-->
    <!--      :options="typeOptions"-->
    <!--    />-->
    <!--    <BaseSelect-->
    <!--      v-if="stepOne.type === CHALLENGE_TYPES.duration.value"-->
    <!--      v-model="stepOne.duration"-->
    <!--      class="mb-3 mt-5"-->
    <!--      :placeholder="$t('common.duration')"-->
    <!--      :label="$t('common.duration')"-->
    <!--      full-->
    <!--      :options="durationOptions"-->
    <!--    />-->
  </div>
</template>

<script setup lang="ts">
  import BaseInput from '../components/BaseInput.vue';
  import BaseTextarea from '../components/BaseTextarea.vue';
  import { onMounted, ref } from 'vue';
  import { useStore } from '../composables/useStore';
  import { customAlphabet } from 'nanoid';
  import { useI18n } from 'vue-i18n';
  // import { CHALLENGE_TYPES } from '../helpers/constants';

  const { stepOne } = useStore();
  const { t } = useI18n();

  // const typeOptions = ref([
  //   { label: CHALLENGE_TYPES.oneTime.label, value: CHALLENGE_TYPES.oneTime.value },
  //   { label: CHALLENGE_TYPES.duration.label, value: CHALLENGE_TYPES.duration.value },
  // ]);
  //
  // const durationOptions = ref(
  //   Array.from({ length: 30 }, (v, i) => ({ label: `${i + 1} ${t('common.days')}`, value: i + 1 }))
  // );
</script>
