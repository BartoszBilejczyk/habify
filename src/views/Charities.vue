<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav :title="$t('titles.charities')" back-route="active-challenges" />
    <div class="px-5">
      <div class="flex justify-between mb-4">
        <BaseLabel
          :active="filter === 'all'"
          :color="filter === 'all' ? 'primary' : 'white'"
          class="mx-0.5"
          @click="filter = 'all'"
        >
          All
        </BaseLabel>
        <BaseLabel
          :active="filter === CHARITY_CATEGORY.kids.value"
          :color="filter === CHARITY_CATEGORY.kids.value ? 'primary' : 'white'"
          class="mx-0.5"
          @click="filter = CHARITY_CATEGORY.kids.value"
        >
          {{ CHARITY_CATEGORY.kids.label }}
        </BaseLabel>
        <BaseLabel
          :active="filter === CHARITY_CATEGORY.environment.value"
          :color="filter === CHARITY_CATEGORY.environment.value ? 'primary' : 'white'"
          class="mx-0.5"
          @click="filter = CHARITY_CATEGORY.environment.value"
        >
          {{ CHARITY_CATEGORY.environment.label }}
        </BaseLabel>
        <BaseLabel
          :active="filter === CHARITY_CATEGORY.animals.value"
          :color="filter === CHARITY_CATEGORY.animals.value ? 'primary' : 'white'"
          class="mx-0.5"
          @click="filter = CHARITY_CATEGORY.animals.value"
        >
          {{ CHARITY_CATEGORY.animals.label }}
        </BaseLabel>
        <BaseLabel
          :active="filter === CHARITY_CATEGORY.other.value"
          :color="filter === CHARITY_CATEGORY.other.value ? 'primary' : 'white'"
          class="mx-0.5"
          @click="filter = CHARITY_CATEGORY.other.value"
        >
          {{ CHARITY_CATEGORY.other.label }}
        </BaseLabel>
      </div>
      <BaseBox v-for="charity in charitiesFiltered" class="mb-4">
        <div class="flex">
          <img
            class="w-14"
            src="https://media-exp1.licdn.com/dms/image/C510BAQH5ImdvOJqZPw/company-logo_200_200/0/1519882182260?e=2147483647&v=beta&t=STReeUXvr0m7iiRNnFi-Ni61-j2v-FbD6BquwseGvnI"
            :alt="charity.name"
          />
          <div class="font-bold ml-3 pr-20">{{ charity.name }}</div>
        </div>
        <div class="flex justify-end">
          <BaseButton primary xsmall @click="handleStartNewChallenge(charity)">Create a challenge</BaseButton>
        </div>
      </BaseBox>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseBox from '../components/BaseBox.vue';
  import BaseButton from '../components/BaseButton.vue';
  import BaseLabel from '../components/BaseLabel.vue';
  import { computed, onMounted, ref } from 'vue';

  import { charities } from '../helpers/charities';
  import { Charity, CharityCategory } from '../types';
  import { CHARITY_CATEGORY } from '../helpers/constants';
  import { useStore } from '../composables/useStore';
  import { useRouter } from 'vue-router';

  const filter = ref<CharityCategory | 'all'>('all');
  const { stepOne } = useStore();
  const { push, currentRoute, replace } = useRouter();

  onMounted(async () => {
    if (currentRoute.value.query?.forceBack) {
      const query = { ...currentRoute.value.query };
      delete query.forceBack;
      await replace({ query });
    }
  });

  const charitiesFiltered = computed(() => {
    switch (filter.value) {
      case 'all':
        return charities;
      case CHARITY_CATEGORY.kids.value:
        return charities.filter(c => c.category === CHARITY_CATEGORY.kids.value);
      case CHARITY_CATEGORY.environment.value:
        return charities.filter(c => c.category === CHARITY_CATEGORY.environment.value);
      case CHARITY_CATEGORY.animals.value:
        return charities.filter(c => c.category === CHARITY_CATEGORY.animals.value);
      case CHARITY_CATEGORY.other.value:
        return charities.filter(c => c.category === CHARITY_CATEGORY.other.value);
    }
  });

  const handleStartNewChallenge = async (charity: Charity) => {
    stepOne.betDetails = `Loser pays X to ${charity.name}.`;

    await push({ name: 'new-challenge', query: { ...currentRoute.value.query, forceBack: 'charities' } });
  };
</script>
