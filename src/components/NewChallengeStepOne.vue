<template>
  <div class="">
    <BaseSection title="Challenge">
      <BaseInput v-model="input1" class="mb-3" placeholder="e.g. Who will make more pushups?" label="Challenge" full />
      <BaseSelect v-model="input5" class="mb-3" placeholder="Type" label="Type" full />
      <BaseSelect v-if="input5 === 'B'" v-model="input2" class="mb-3" placeholder="Duration" label="Duration" full />
    </BaseSection>
    <BaseSection title="Bet">
      <BaseSelect v-model="input3" class="mb-3" placeholder="Category" label="Category" full />
      <BaseTextarea v-model="input4" class="mb-3" placeholder="Details" label="Details" full />
    </BaseSection>
  </div>
</template>

<script setup lang="ts">
  import BaseSection from '../components/BaseSection.vue';
  import BaseInput from '../components/BaseInput.vue';
  import BaseSelect from '../components/BaseSelect.vue';
  import { ref } from 'vue';
  import BaseTextarea from './BaseTextarea.vue';

  const input1 = ref('');
  const input2 = ref('');
  const input3 = ref('');
  const input4 = ref('');
  const input5 = ref('');
</script>
