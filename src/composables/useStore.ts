import { createGlobalState } from '@vueuse/core';
import 'firebase/firestore';
import { reactive } from 'vue';
import { Challenge } from '../types';

export const store = createGlobalState(() => {
  const stepOne = reactive<Partial<Challenge>>({
    title: '',
    duration: '',
    betCategory: null,
    betDetails: '',
    type: null,
  });

  return { stepOne };
});
