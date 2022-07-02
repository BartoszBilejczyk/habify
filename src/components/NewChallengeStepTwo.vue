<template>
  <div class="">
    <BaseSection title="Challenge existing friends">You don't have any friends added yet.</BaseSection>
    <BaseSection title="Challenge new person">
      <BaseInfoToCopy>https://habify.com/sad7891789ds</BaseInfoToCopy>
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
</script>
