<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav title="Invite Friend" back-route="profile" background />
    <div class="px-4 pt-4 w-full h-full flex-1 flex flex-col justify-center pb-20 bg-primary dark:bg-dark text-white">
      <div class="text-sm text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab ad, aperiam eius esse, exercitationem fuga harum
      </div>
      <div class="flex flex-col items-center">
        <img :src="image" alt="Invite friend illustration" class="my-8 h-56" />
        <div class="border-dashed border border-white p-4 rounded-xl w-48 text-center font-black">{{ code }}</div>
        <div class="mt-8 flex flex-col items-center">
          <div v-if="copied" class="text-lg font-semibold text-white">Copied</div>
          <BaseButton v-else white @click="copy(`https://habifyapp.netlify.app?invite=${code}`)">
            Copy referral code
          </BaseButton>
          <BaseButton white @click="invite">Invite</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseButton from '../components/BaseButton.vue';
  import { computed, ref } from 'vue';
  import { useClipboard } from '@vueuse/core';

  const code = ref('SJDAS79');

  const { copy, copied } = useClipboard();

  const image = computed(() => {
    return new URL('../assets/auth-start.png', import.meta.url);
  });

  const invite = () => {
    if (navigator.share) {
      navigator.share({ text: 'check out', url: `https://habifyapp.netlify.app?invite=${code.value}` });
    } else {
      copy(`https://habifyapp.netlify.app?invite=${code.value}`);
    }
  };
</script>
