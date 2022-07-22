<template>
  <div>
    <BaseBox v-for="bet in betExamples" class="mb-4">
      <div class="flex justify-between items-center">
        <div class="font-bold ml-3 pr-6">{{ bet.titles[locale] }}</div>
        <BaseButton primary small @click="handleStartNewBet(bet)">Use</BaseButton>
      </div>
    </BaseBox>
  </div>
</template>

<script setup lang="ts">
  import BaseBox from '../components/BaseBox.vue';
  import BaseButton from '../components/BaseButton.vue';
  import { onMounted } from 'vue';

  import { betExamples } from '../helpers/bet-examples';
  import { BetExample } from '../types';
  import { useStore } from '../composables/useStore';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  const { locale } = useI18n();

  const { stepOne } = useStore();
  const { push, currentRoute, replace } = useRouter();
  const emit = defineEmits(['hide']);

  onMounted(async () => {
    if (currentRoute.value.query?.forceBack) {
      const query = { ...currentRoute.value.query };
      delete query.forceBack;
      await replace({ query });
    }
  });

  const handleStartNewBet = async (bet: BetExample) => {
    stepOne.betDetails = `${bet.titles[locale.value]}`;
    emit('hide');
  };
</script>
