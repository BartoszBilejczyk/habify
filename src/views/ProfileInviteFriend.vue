<template>
  <div class="w-full h-full">
    <BaseTopNav title="Invite Friend" back-route="profile" background />
    <div class="px-6 pt-4 w-full h-full bg-primary text-white">
      <div class="text-sm text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab ad, aperiam eius esse, exercitationem fuga harum
      </div>
      <div class="flex flex-col items-center">
        <div class="bg-white-200 p-16 my-8"></div>
        <div class="border-dashed border border-white p-4 rounded-xl w-48 text-center">SJDAS79</div>
        <div class="mt-8 flex flex-col items-center">
          <button>Share</button>
          <div class="my-3">or</div>
          <button class="underline">Copy referral code</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
</script>
