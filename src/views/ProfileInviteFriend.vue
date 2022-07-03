<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav title="Invite Friend" back-route="profile" background />
    <div class="px-4 pt-4 w-full h-full flex-1 flex flex-col justify-center pb-20 bg-primary text-white">
      <div class="text-sm text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab ad, aperiam eius esse, exercitationem fuga harum
      </div>
      <div class="flex flex-col items-center">
        <img :src="image" alt="Invite friend illustration" class="mt-12 mb-8 h-40" />
        <div class="border-dashed border border-white p-4 rounded-xl w-48 text-center font-black">SJDAS79</div>
        <div class="mt-8 flex flex-col items-center">
          <BaseButton class="underline">Copy referral code</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseButton from '../components/BaseButton.vue';
  import { computed } from 'vue';

  const image = computed(() => {
    return new URL('../assets/auth-start.png', import.meta.url);
  });
</script>
