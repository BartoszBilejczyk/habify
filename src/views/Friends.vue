<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav title="Friends" back-route="home">
      <BaseLabel color="primary" @click="push({ name: 'profile-invite' })">(icon) Invite</BaseLabel>
    </BaseTopNav>
    <div class="px-4 flex flex-col flex-1 pt-4 pb-8">
      <div
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
          <BaseButton outline-white small>Challenge</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';
  import BaseLabel from '../components/BaseLabel.vue';
  import BaseButton from '../components/BaseButton.vue';
  import { useFirebase } from '../useFirebase';
  import { useRouter } from 'vue-router';
  import ChevronRight from '../assets/icons/chevron-right.svg?component';

  const { userProfile } = useFirebase();
  const { push } = useRouter();

  const getInitials = (name: string) => {
    const splitted: string[] = name.split(' ');
    // @ts-ignore
    return splitted.shift().charAt(0) + splitted.pop().charAt(0);
  };
</script>
