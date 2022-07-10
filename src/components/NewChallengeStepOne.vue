<template>
  <div class="">
    <BaseSection title="Challenge">
      <BaseInput
        v-model="stepOne.title"
        class="mb-3"
        placeholder="e.g. Who will make more pushups?"
        label="Challenge"
        full
      />
      <BaseSelect v-model="stepOne.type" class="mb-3" placeholder="Type" label="Type" full :options="typeOptions" />
      <BaseSelect
        v-if="stepOne.duration === 'B'"
        v-model="stepOne.duration"
        class="mb-3"
        placeholder="Duration"
        label="Duration"
        full
        :options="durationOptions"
      />
    </BaseSection>
    <BaseSection title="Bet">
      <BaseSelect
        v-model="stepOne.betCategory"
        class="mb-3"
        placeholder="Category"
        label="Category"
        full
        :options="betCategoryOptions"
      />
      <BaseTextarea v-model="stepOne.betDetails" class="mb-3" placeholder="Details" label="Details" full />
    </BaseSection>
  </div>
</template>

<script setup lang="ts">
  import BaseSection from '../components/BaseSection.vue';
  import BaseInput from '../components/BaseInput.vue';
  import BaseSelect from '../components/BaseSelect.vue';
  import { ref } from 'vue';
  import BaseTextarea from './BaseTextarea.vue';
  import { useStore } from '../composables/useStore';

  const { stepOne } = useStore();

  const typeOptions = ref([
    { label: 'One occurrence', value: 'oneTime' },
    { label: 'Time-boxed', value: 'duration' },
  ]);

  const durationOptions = ref(Array.from({ length: 14 }, (v, i) => ({ label: `${i + 1} days`, value: i + 1 })));

  const betCategoryOptions = ref([
    { label: 'Social', value: 'social' },
    { label: 'Financial', value: 'financial' },
    { label: 'Sport', value: 'sport' },
    { label: 'Other', value: 'other' },
  ]);
</script>
