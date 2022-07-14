<template>
  <div class="flex items-center text-sm">
    <component :is="item.icon" class="w-5 h-5 mr-3" />
    {{ item.title }}
  </div>
  <ChevronRight class="w-3 h-3" />
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { MenuItem } from '../views/Profile.vue';
  import ChevronRight from '../assets/icons/chevron-right.svg?component';

  defineProps({
    item: Object as PropType<MenuItem>,
  });
</script>
