<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav :title="$t('titles.friends')" back-route="home">
      <BaseLabel color="primary" @click="handleAddNewFriend">
        <PlusIcon class="text-primary basis-3 w-3 h-3 mr-1.5" />
        {{ $t('common.invite') }}
      </BaseLabel>
    </BaseTopNav>
    <div class="px-4 flex flex-col flex-1 pt-4 pb-8">
      <div v-if="loading">{{ $t('common.loading') }}</div>
      <div
        v-else-if="!userProfile.friends?.length"
        class="px-5 py-4 mt-4 bg-coral-800 text-white flex justify-between items-center rounded-lg shadow-lg"
      >
        <div class="text-lg">
          <span class="font-bold">{{ $t('friends.addFirstFriend.0') }}</span>
          <br />
          <span>{{ $t('friends.addFirstFriend.1') }}</span>
        </div>
        <BaseButton outline-white small @click="handleAddNewFriend">{{ $t('common.invite') }}</BaseButton>
      </div>
      <div
        v-else
        v-for="friend in userProfile.friends"
        class="bg-white-10 dark:bg-dark-800 text-white-700 dark:text-white-10 rounded-lg mb-4 p-3"
      >
        <div class="flex items-center justify-between flex-nowrap">
          <div class="flex items-center">
            <div
              v-if="friend.name"
              class="h-10 w-10 rounded-full bg-white-20 dark:bg-white-400 flex items-center justify-center font-bold"
            >
              {{ getInitials(friend.name) }}
            </div>
            <div v-else class="h-10 w-10 rounded-full bg-white-20 dark:bg-white-400 flex items-center justify-center">
              <ChevronRight class="w-4 h-4 text-white" />
            </div>
            <div class="ml-2">
              {{ friend.name }}
            </div>
          </div>
          <BaseButton outline small>{{ $t('common.challenge') }}</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseLabel from '../components/BaseLabel.vue';
  import BaseButton from '../components/BaseButton.vue';
  import { useUser } from '../composables/useUser';
  import { useRouter } from 'vue-router';
  import PlusIcon from '../assets/icons/plus.svg?component';
  import ChevronRight from '../assets/icons/chevron-right.svg?component';
  import { ref } from 'vue';

  const { userProfile } = useUser();
  const { push } = useRouter();

  const loading = ref(false);

  const getInitials = (name: string) => {
    const splitted: string[] = name.split(' ');
    // @ts-ignore
    return splitted.shift().charAt(0) + splitted.pop().charAt(0);
  };

  const handleAddNewFriend = async () => {
    await push({ name: 'profile-invite' });
  };
</script>
