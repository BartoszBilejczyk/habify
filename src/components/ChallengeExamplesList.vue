<template>
  <div>
    <div class="flex justify-between mt-2 mb-6">
      <BaseLabel
        :active="filter === 'all'"
        :color="filter === 'all' ? 'primary' : 'white'"
        class="mx-0.5"
        @click="filter = 'all'"
      >
        All
      </BaseLabel>
      <BaseLabel
        :active="filter === CHALLENGE_CATEGORY.social.value"
        :color="filter === CHALLENGE_CATEGORY.social.value ? 'primary' : 'white'"
        class="mx-0.5"
        @click="filter = CHALLENGE_CATEGORY.social.value"
      >
        {{ CHALLENGE_CATEGORY.social.label }}
      </BaseLabel>
      <BaseLabel
        :active="filter === CHALLENGE_CATEGORY.education.value"
        :color="filter === CHALLENGE_CATEGORY.education.value ? 'primary' : 'white'"
        class="mx-0.5"
        @click="filter = CHALLENGE_CATEGORY.education.value"
      >
        {{ CHALLENGE_CATEGORY.education.label }}
      </BaseLabel>
      <BaseLabel
        :active="filter === CHALLENGE_CATEGORY.sport.value"
        :color="filter === CHALLENGE_CATEGORY.sport.value ? 'primary' : 'white'"
        class="mx-0.5"
        @click="filter = CHALLENGE_CATEGORY.sport.value"
      >
        {{ CHALLENGE_CATEGORY.sport.label }}
      </BaseLabel>
      <BaseLabel
        :active="filter === CHALLENGE_CATEGORY.other.value"
        :color="filter === CHALLENGE_CATEGORY.other.value ? 'primary' : 'white'"
        class="mx-0.5"
        @click="filter = CHALLENGE_CATEGORY.other.value"
      >
        {{ CHALLENGE_CATEGORY.other.label }}
      </BaseLabel>
    </div>
    <BaseBox v-for="challenge in challengeExamplesFiltered" class="mb-4">
      <div class="flex justify-between items-center">
        <div class="font-bold ml-3 pr-6">{{ challenge.titles[locale] }}</div>
        <BaseButton primary small @click="handleStartNewChallenge(challenge)">Use</BaseButton>
      </div>
    </BaseBox>
  </div>
</template>

<script setup lang="ts">
  import BaseBox from '../components/BaseBox.vue';
  import BaseButton from '../components/BaseButton.vue';
  import BaseLabel from '../components/BaseLabel.vue';
  import { computed, onMounted, ref } from 'vue';

  import { challengeExamples } from '../helpers/challenge-examples';
  import { ChallengeExample, ChallengeCategory } from '../types';
  import { CHALLENGE_CATEGORY } from '../helpers/constants';
  import { useStore } from '../composables/useStore';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  const { locale } = useI18n();

  const filter = ref<ChallengeCategory | 'all'>('all');
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

  const challengeExamplesFiltered = computed<ChallengeExample[]>(() => {
    switch (filter.value) {
      case 'all':
        return challengeExamples;
      case CHALLENGE_CATEGORY.social.value:
        return challengeExamples.filter(c => c.category === CHALLENGE_CATEGORY.social.value);
      case CHALLENGE_CATEGORY.education.value:
        return challengeExamples.filter(c => c.category === CHALLENGE_CATEGORY.education.value);
      case CHALLENGE_CATEGORY.sport.value:
        return challengeExamples.filter(c => c.category === CHALLENGE_CATEGORY.sport.value);
      case CHALLENGE_CATEGORY.other.value:
        return challengeExamples.filter(c => c.category === CHALLENGE_CATEGORY.other.value);
      default:
        return challengeExamples;
    }
  });

  const handleStartNewChallenge = async (challenge: ChallengeExample) => {
    stepOne.title = `${challenge.titles[locale.value]}`;
    stepOne.challengeCategory = challenge.category;
    stepOne.points = challenge.points;

    if (currentRoute.value.name === 'challenge-examples') {
      await push({ name: 'new-challenge', query: { ...currentRoute.value.query, forceBack: 'challenge-examples' } });
    } else {
      emit('hide');
    }
  };
</script>
