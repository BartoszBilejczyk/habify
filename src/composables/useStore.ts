import { createGlobalState } from '@vueuse/core';
import 'firebase/firestore';
import { reactive, ref } from 'vue';
import { Challenge, User } from '../types';
import { emptyUser } from '../helpers/empty';

export const useStore = createGlobalState(() => {
  const stepOne = reactive<Partial<Challenge>>({
    title: '',
    duration: '',
    betCategory: null,
    betDetails: '',
    type: null,
  });

  const referrer = ref<User>({ ...emptyUser });

  return { stepOne, referrer };
});
