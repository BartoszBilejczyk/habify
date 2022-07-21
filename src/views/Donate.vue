<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav :title="$t('titles.donate')" back-route="active-challenges" />
    <div class="px-8 pt-4 w-full h-full flex-1 flex flex-col justify-center pb-20 dark:bg-dark text-white">
      <LottieAnimation :animation-data="donateAnimation" class="-mt-24" />
      <div class="mt-10 text-xl font-bold text-white-700 dark:text-white-10 text-center mt-4 mb-6">
        Donate to appreciate authors
      </div>
      <div class="flex mb-4 mt-3">
        <BaseInput class="flex-2" v-model="amount" placeholder="Amount" full />
        <BaseSelect v-model="currency" class="ml-4 flex-1" placeholder="Currency" full :options="currencyOptions" />
      </div>
      <BaseButton primary @click="handleDonate">Donate</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseButton from '../components/BaseButton.vue';
  import { ref } from 'vue';
  import donateAnimation from '../assets/lottie/donate-animation.json';
  import BaseInput from '../components/BaseInput.vue';
  import BaseSelect from '../components/BaseSelect.vue';

  const amount = ref('10');
  const currency = ref('PLN');

  const currencyOptions = ref([
    { label: 'PLN', value: 'PLN' },
    { label: 'EUR', value: 'EUR' },
    { label: 'USD', value: 'USD' },
  ]);

  const handleDonate = () => {
    if (!amount.value || !currency.value) {
      return;
    }

    alert('donate invoked');
  };
</script>
