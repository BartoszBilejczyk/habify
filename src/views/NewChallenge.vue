<template>
  <div class="w-full h-full">
    <BaseTopNav title="New Challenge" />
    <div class="px-4">
      <NewChallengeMenu class="mt-3 mb-5" :step="step" />
      <NewChallengeStepOne v-show="step === 1" />
      <NewChallengeStepTwo v-show="step === 2" />
      <NewChallengeStepThree v-show="step === 3" />
      <NewChallengeButtons class="mt-3" :step="step" @next="handleNext" @prev="handlePrev" @finish="handleFinish" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import BaseTopNav from '../components/BaseTopNav.vue';
  import NewChallengeStepOne from '../components/NewChallengeStepOne.vue';
  import NewChallengeStepTwo from '../components/NewChallengeStepTwo.vue';
  import NewChallengeStepThree from '../components/NewChallengeStepThree.vue';
  import NewChallengeMenu from '../components/NewChallengeMenu.vue';
  import NewChallengeButtons from '../components/NewChallengeButtons.vue';

  const step = ref(1);

  const handleNext = () => {
    step.value++;
  };
  const handlePrev = () => {
    step.value--;
  };
  const handleFinish = () => {
    console.log('finish');
  };
</script>
