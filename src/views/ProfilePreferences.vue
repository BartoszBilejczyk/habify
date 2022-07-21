<template>
  <div class="w-full h-full flex flex-col flex-1">
    <BaseTopNav :title="$t('titles.preferences')" back-route="profile" />
    <div class="mt-6 px-5">
      <div class="flex mb-6 justify-between">
        <div class="font-bold">Dark mode</div>
        <label for="default-toggle" class="inline-flex relative items-center cursor-pointer">
          <input type="checkbox" v-model="isDark" id="default-toggle" class="sr-only peer" />
          <div
            class="w-16 h-8 bg-white-20 peer-focus:outline-none rounded-full peer dark:bg-white-200 peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[5px] after:bg-white after:border-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-white-200 peer-checked:bg-primary-600"
          />
        </label>
      </div>
      <div class="flex mb-6 justify-between">
        <div class="font-bold">Language</div>
        <div class="flex">
          <div
            class="h-8 w-10 rounded border border-solid flex items-center justify-center"
            :class="{
              'bg-primary text-white border-primary': locale === 'pl',
              'border-white-100': locale !== 'pl',
            }"
            @click="locale = 'pl'"
          >
            PL
          </div>
          <div
            class="h-8 w-10 rounded border border-solid flex items-center justify-center ml-3"
            :class="{
              'bg-primary text-white border-primary': locale === 'en',
              'border-white-100': locale !== 'en',
            }"
            @click="locale = 'en'"
          >
            EN
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseTopNav from '../components/BaseTopNav.vue';

  import { useDark } from '@vueuse/core';
  import { useI18n } from 'vue-i18n';

  const isDark = useDark();
  const { locale } = useI18n();
</script>
