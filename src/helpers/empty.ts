import {
  User,
  UserBasic,
  Friend,
  Challenge,
  Charity,
  Task,
  Notification,
  Invitation,
  InvitationForChallenge,
  ChallengeExample,
} from '../types';

export const emptyUser: User = {
  id: '',
  email: '',
  phone: '',
  name: '',
  nickname: '',
  points: 0,
  image: '',
  friends: [],
  notifications: [], // TODO check if it should be here
  notificationSettings: [],
  allowEmails: false,
  tasks: [],
  challenges: [],
  feedbackSent: [],
  profileFinished: false,
  onboarded: false,
  referralCode: '',
  usedReferralCode: '',
};

export const emptyUserBasic: UserBasic = {
  id: '',
  email: '',
  phone: '',
  name: '',
  points: 0,
  image: '',
};

export const emptyFriend: Friend = {
  id: '',
  email: '',
  phone: '',
  name: '',
  nickname: '',
  addedDate: '',
};

export const emptyChallenge: Challenge = {
  id: '',
  inviter: { ...emptyUserBasic },
  inviterId: '',
  invitee: { ...emptyUserBasic },
  inviteeId: '',
  inviterSelectedWinner: null,
  inviterSelectedLoser: null,
  inviteeSelectedWinner: null,
  inviteeSelectedLoser: null,
  title: '',
  duration: '',
  type: null,
  betCategory: null,
  betDetails: null, // TODO
  points: 0,
  inviteLink: '',
  proposedChanges: null, // TODO
  status: null,
  confirmationPhotos: [],
  confirmationType: null,
  createdOn: 0,
  updatedOn: 0,
  acceptedOn: 0,
};

export const emptyCharity: Charity = {
  id: '',
  logo: '',
  name: '',
  link: '',
  description: '',
  image: '',
  category: '',
};

export const emptyTask: Task = {
  id: '',
  name: '',
  description: '',
  points: 0,
  expirationDate: '',
  finishDate: '',
  category: 'other',
  status: 'active',
};

export const emptyNotification: Notification = {
  id: '',
  name: '',
  description: '',
  points: 0,
  category: 'other',
  status: 'active',
};

export const emptyInvitation: Invitation = {
  id: '',
  referralCode: '',
  invitee: { ...emptyUserBasic },
  inviter: { ...emptyUserBasic },
};

export const emptyInvitationForChallenge: InvitationForChallenge = {
  ...emptyInvitation,
  challenge: { ...emptyChallenge },
};

export const emptyChallengeExample: ChallengeExample = {
  id: '',
  title: '',
  duration: '',
  type: null,
  points: 0,
};
