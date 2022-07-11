<template>
  <div class="flex flex-col items-center justify-center px-6">
    <h2 class="text-2xl">Finish your profile</h2>
    <div class="mt-6 text-center px-10">
      Provide us with some details, so that your friends can easily identify you.
    </div>
    <BaseInput class="w-full mt-6" v-model="name" placeholder="Name*" full required />
    <BaseInput class="w-full mt-3" v-model="surname" placeholder="Surname" full />
    <BaseCheckbox
      class="mt-5"
      v-model="allowEmails"
      label="Send me email notifications for most
important actions in the app
(challenge invitation, challenge finish)."
    />
    <BaseButton class="mt-8" primary full @click="updateProfile">Update profile</BaseButton>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  import BaseInput from '../BaseInput.vue';
  import BaseButton from '../BaseButton.vue';
  import BaseCheckbox from '../BaseCheckbox.vue';
  const name = ref('');
  const surname = ref('');
  const allowEmails = ref(false);
  // add photo
  const fullName = computed(() => `${name.value}${surname.value ? ` ${surname.value}` : ''}`);

  const emit = defineEmits(['updateProfile']);

  const updateProfile = () => {
    emit('updateProfile', { name: fullName.value, allowEmails: allowEmails.value });
  };
</script>

<!--.then(function () { user.updateProfile({ displayName: displayName, photoURL: photoURL }); })-->
