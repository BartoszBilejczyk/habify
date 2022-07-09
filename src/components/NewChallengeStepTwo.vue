<template>
  <div class="">
    <BaseSection title="Challenge existing friends">You don't have any friends added yet.</BaseSection>
    <BaseSection title="Challenge new person">
      <BaseInfoToCopy>{{ link }}</BaseInfoToCopy>
      <div class="mt-8 flex flex-col items-center">
        <div v-if="copied" class="text-lg font-semibold text-white">Copied</div>
        <BaseButton v-else white @click="copy(link)">Copy link to challenge</BaseButton>
      </div>
      <div class="text-center mt-5">
        <b>Click next.</b>
        <br />
        <div class="mt-2 w-64 mx-auto">We will show you the link and share options on the next step.</div>
      </div>
    </BaseSection>
  </div>
</template>

<script setup lang="ts">
  import BaseSection from './BaseSection.vue';
  import BaseInfoToCopy from './BaseInfoToCopy.vue';
  import BaseButton from './BaseButton.vue';
  import { ref } from 'vue';
  import { useClipboard } from '@vueuse/core';

  const link = ref('https://habify.com/sad7891789ds');
  const { copy, copied } = useClipboard();
</script>
