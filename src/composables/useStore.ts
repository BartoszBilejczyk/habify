import { createGlobalState } from '@vueuse/core';
import 'firebase/firestore';
import { computed, reactive, ref } from 'vue';
import { Challenge, User } from '../types';
import { emptyChallenge, emptyUser, emptyUserBasic } from '../helpers/empty';
import { useFirebase } from './useFirebase';
import { BET_CATEGORY, CHALLENGE_STATUS, CHALLENGE_TYPES } from '../helpers/constants';
import { useUser } from './useUser';

export const useStore = createGlobalState(() => {
  const { getCollectionItemsWhere, db } = useFirebase();
  const { userProfileBasic } = useUser();
  const challenges = ref<Challenge[]>([]);

  const challenge = ref<Challenge>({ ...emptyChallenge });

  const stepOne = reactive<Partial<Challenge>>({
    id: '',
    title: '',
    duration: '',
    betCategory: BET_CATEGORY.other.value,
    betDetails: '',
    type: CHALLENGE_TYPES.oneTime.value,
    invitee: { ...emptyUserBasic },
    inviteeId: '',
  });

  const inviteLink = computed(() => `https://habbi.app/invite?code=${stepOne.id}`);
  const challengeLoggedInUser = computed(() =>
    userProfileBasic.value.id === challenge.value.inviterId ? challenge.value.inviter : challenge.value.invitee
  );
  const challengeOtherUser = computed(() =>
    userProfileBasic.value.id === challenge.value.inviterId ? challenge.value.invitee : challenge.value.inviter
  );

  const newChallenge = computed<Challenge>(() => ({
    ...emptyChallenge,
    ...stepOne,
    status: CHALLENGE_STATUS.pending.value,
    confirmationType: 'manual',
    points: 500,
  }));

  const referrer = ref<User>({ ...emptyUser });

  const getChallenges = async (overrideId = '') => {
    // TODO is there better way?
    const inviterChallenges = await getCollectionItemsWhere('challenges', [
      'inviterId',
      '==',
      userProfileBasic.value.id || overrideId,
    ]);
    const inviteeChallenges = await getCollectionItemsWhere('challenges', [
      'inviteeId',
      '==',
      userProfileBasic.value.id || overrideId,
    ]);

    challenges.value = [...inviterChallenges, ...inviteeChallenges].sort((a, b) => b.updatedOn - a.updatedOn);
  };

  const getOneChallenge = async (id: string) => {
    return db.doc(`challenges/${id}`).onSnapshot(doc => {
      // @ts-ignore
      challenge.value = { ...doc.data(), id: doc.id };
    });
  };

  const updateChallenge = (challengeToUpdate: Challenge) => {
    const challengeIndex = challenges.value.findIndex(challenge => challenge.id === challengeToUpdate.id);

    challenges.value = [
      ...challenges.value.slice(0, challengeIndex),
      challengeToUpdate,
      ...challenges.value.slice(challengeIndex + 1),
    ];
  };

  return {
    stepOne,
    newChallenge,
    referrer,
    challenges,
    inviteLink,
    challenge,
    challengeLoggedInUser,
    challengeOtherUser,
    getChallenges,
    updateChallenge,
    getOneChallenge,
  };
});
