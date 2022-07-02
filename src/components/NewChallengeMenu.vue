<template>
  <div class="flex justify-around">
    <div :class="{ 'font-bold': step >= 1, 'text-green': step > 1 }">1. Basics</div>
    <div :class="{ 'font-bold': step >= 2, 'text-green': step > 2 }">2. Invite</div>
    <div :class="{ 'font-bold': step === 3 }">3. Confirm</div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    step: number;
  }>();
</script>
