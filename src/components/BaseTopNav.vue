<template>
  <div class="w-full nav pb-3" :class="background && 'bg-primary dark:bg-dark text-white-10'">
    <div class="nav-content">
      <div
        class="px-4 w-full flex items-center relative h-6"
        :class="{ 'justify-between': icon, 'justify-end': !icon }"
      >
        <span v-if="icon" class="">
          <BackIcon
            v-if="icon === 'back'"
            class="w-3.5 h-3.5"
            :class="background ? 'text-white-10' : 'text-white-300 dark:text-white-20'"
            @click="handleBack"
          />
          <CloseIcon
            v-if="icon === 'close'"
            class="w-5 h-5"
            :class="background ? 'text-white-10' : 'text-white-300 dark:text-white-20'"
          />
          <MenuIcon
            v-if="icon === 'menu'"
            class="w-5 h-5"
            :class="background ? 'text-white-10' : 'text-white-300 dark:text-white-20'"
          />
        </span>
        <span
          class="font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
          :class="{ 'text-base': title.length > 12, ' text-lg ': title.length <= 12 }"
        >
          {{ title }}
        </span>
        <div v-if="$slots.default">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { useRouter } from 'vue-router';

  import BackIcon from '../assets/icons/chevron-left.svg?component';
  import CloseIcon from '../assets/icons/close.svg?component';
  import MenuIcon from '../assets/icons/menu.svg?component';

  type TopNavIcon = 'close' | 'back' | 'menu';

  const { push } = useRouter();

  const props = defineProps({
    icon: {
      type: String as PropType<TopNavIcon>,
      default: 'back',
    },
    background: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Home',
    },
    backRoute: {
      type: String,
      default: 'home',
    },
  });

  const handleBack = async () => {
    await push({ name: props.backRoute });
  };
</script>

<style>
  @media (display-mode: standalone) {
    .nav {
      padding-left: env(safe-inset-area-left) !important;
      padding-top: env(safe-inset-area-top) !important;
      padding-right: env(safe-inset-area-right) !important;
    }
  }

  .nav-content {
    padding-top: 12px;
  }
</style>
