<template>
  <div class="m-1">
    <BaseButton primary>Register</BaseButton>
  </div>
  <div class="m-1">
    <BaseButton secondary>Register</BaseButton>
  </div>
  <div class="m-1">
    <BaseButton outline>Register</BaseButton>
  </div>
  <div class="m-1">
    <BaseButton text-primary>Register</BaseButton>
  </div>
  <div class="m-1">
    <BaseButton primary small>Register</BaseButton>
  </div>
  <div class="m-1">
    <BaseButton primary full>Register</BaseButton>
  </div>
  <div class="m-1">
    <BaseInput v-model="input1" label="Username" placeholder="Username" />
  </div>
  <div class="m-1">
    <BaseInput v-model="input2" full placeholder="Password" />
  </div>
  <div class="m-1">
    <BaseCheckbox v-model="checkbox1" label="a dsaskljd aslkjdaskjladskjld jlka sdjl sajkldasklj da" />
  </div>
  <div class="m-1">
    <BaseCheckbox v-model="checkbox2" label="a dsaskljd aslkjdaskjladskjld jlka sdjl sajkldasklj da" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import BaseButton from '../components/BaseButton.vue';
  import BaseInput from '../components/BaseInput.vue';
  import BaseCheckbox from '../components/BaseCheckbox.vue';

  const input1 = ref('');
  const input2 = ref('');
  const checkbox1 = ref('');
  const checkbox2 = ref('');
</script>
