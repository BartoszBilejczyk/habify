import { createGlobalState } from '@vueuse/core';
import 'firebase/firestore';
import { computed, reactive, ref } from 'vue';
import { Challenge, User } from '../types';
import { emptyChallenge, emptyUser, emptyUserBasic } from '../helpers/empty';

export const useStore = createGlobalState(() => {
  const challenges = ref<Challenge[]>([]);

  const stepOne = reactive<Partial<Challenge>>({
    id: '',
    title: '',
    duration: '',
    betCategory: null,
    betDetails: '',
    type: null,
  });

  const stepTwo = ref({
    invitee: { ...emptyUserBasic },
    inviteeId: '',
  });

  const inviteLink = computed(() => `https://habbi.app/invite?code=${stepOne.id}`);

  const newChallenge = computed<Challenge>(() => ({
    ...emptyChallenge,
    ...stepOne,
    ...stepTwo.value,
    status: 'waitsForConfirm',
    confirmationType: 'manual',
    points: 500,
  }));

  const referrer = ref<User>({ ...emptyUser });

  return { stepOne, stepTwo, newChallenge, referrer, challenges, inviteLink };
});
