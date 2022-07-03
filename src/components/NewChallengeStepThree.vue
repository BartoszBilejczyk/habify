<template>
  <div class="">
    <BaseSection title="Confirm Details">
      <BaseBox>
        <div class="flex mb-2">
          <div class="font-semibold grow-0 shrink-0 basis-28">Challenge</div>
          <div>Who makes most pushups.</div>
        </div>
        <div class="flex mb-2">
          <div class="font-semibold grow-0 shrink-0 basis-28">Duration</div>
          <div>7 days.</div>
        </div>
        <div class="flex mb-2">
          <div class="font-semibold grow-0 shrink-0 basis-28">Bet</div>
          <div>Social, manual confirmation.</div>
        </div>
        <div class="flex mb-2">
          <div class="font-semibold grow-0 shrink-0 basis-28">Details</div>
          <div>Share a post which will encourage people to pay for cos charytatywnego.</div>
        </div>
        <div class="flex mb-2">
          <div class="font-semibold grow-0 shrink-0 basis-28">Friend</div>
          <div>Bartek Bilejczyk</div>
        </div>
      </BaseBox>
    </BaseSection>
    <BaseSection title="Share">
      <BaseInfoToCopy>https://habify.com/sad7891789ds</BaseInfoToCopy>
      <div class="flex justify-center mt-4 mb-10">
        <BaseButton text-primary>Copy share link</BaseButton>
      </div>
    </BaseSection>
  </div>
</template>

<script setup lang="ts">
  import BaseSection from './BaseSection.vue';
  import BaseInfoToCopy from './BaseInfoToCopy.vue';
  import BaseBox from './BaseBox.vue';
  import BaseButton from './BaseButton.vue';
</script>
