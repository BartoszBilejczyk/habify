import { createGlobalState } from '@vueuse/core';
import 'firebase/firestore';
import { computed, reactive, ref } from 'vue';
import { Challenge, User } from '../types';
import { emptyChallenge, emptyUser, emptyUserBasic } from '../helpers/empty';
import { useFirebase } from '../useFirebase';
import { CHALLENGE_STATUS } from '../helpers/constants';

export const useStore = createGlobalState(() => {
  const challenges = ref<Challenge[]>([]);
  const { userProfileBasic, getCollectionItemsWhere } = useFirebase();

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
    status: CHALLENGE_STATUS.pending.value,
    confirmationType: 'manual',
    points: 500,
  }));

  const referrer = ref<User>({ ...emptyUser });

  const getChallenges = async () => {
    // TODO is there better way?
    const inviterChallenges = await getCollectionItemsWhere('challenges', [
      'inviterId',
      '==',
      userProfileBasic.value.id,
    ]);
    const inviteeChallenges = await getCollectionItemsWhere('challenges', [
      'inviteeId',
      '==',
      userProfileBasic.value.id,
    ]);

    challenges.value = [...inviterChallenges, ...inviteeChallenges].sort((a, b) => b.updatedOn - a.updatedOn);
  };

  const modalComponent = ref<any>(false);

  const setModalComponent = (value: any) => {
    console.log(value);
    modalComponent.value = value;
  };

  return {
    stepOne,
    stepTwo,
    newChallenge,
    referrer,
    challenges,
    inviteLink,
    modalComponent,
    getChallenges,
    setModalComponent,
  };
});
