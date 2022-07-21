<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav :title="$t('titles.friends')" back-route="active-challenges">
      <BaseLabel color="coral" @click="handleAddNewFriend">
        <PlusIcon class="text-coral-800 basis-3 w-3 h-3 mr-1.5" />
        {{ $t('common.invite') }}
      </BaseLabel>
    </BaseTopNav>
    <div class="px-4 flex flex-col flex-1 mt-4 pb-8">
      <div v-if="loading">{{ $t('common.loading') }}</div>
      <div
        v-else-if="!userProfile.friends?.length"
        class="px-5 py-4 mt-2 bg-coral-800 text-white flex justify-between items-center rounded-lg shadow-lg"
      >
        <div class="text-lg">
          <span class="font-bold">{{ $t('friends.addFirstFriend.0') }}</span>
          <br />
          <span>{{ $t('friends.addFirstFriend.1') }}</span>
        </div>
        <BaseButton outline-white small @click="handleAddNewFriend">{{ $t('common.invite') }}</BaseButton>
      </div>
      <BaseFriend v-else v-for="friend in userProfile.friends" :friend="friend"></BaseFriend>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseFriend from '../components/BaseFriend.vue';
  import BaseLabel from '../components/BaseLabel.vue';
  import BaseButton from '../components/BaseButton.vue';
  import { useUser } from '../composables/useUser';
  import { useRouter } from 'vue-router';
  import PlusIcon from '../assets/icons/plus.svg?component';
  import { ref } from 'vue';

  const { userProfile } = useUser();
  const { push } = useRouter();

  const loading = ref(false);

  const handleAddNewFriend = async () => {
    await push({ name: 'profile-invite' });
  };
</script>
