export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  points: number;
  image: string;
  friends: Friend[];
  notifications: Notification[]; // TODO check if it should be here
  notificationSettings: string[];
  tasks: Task[];
  challenges: Challenge[];
  feedbackSent: string[];
}

export interface UserBasic {
  id: string;
  email: string;
  phone: string;
  name: string;
  points: number;
  image: string;
}

export interface Friend {
  id: string;
  email: string;
  phone: string;
  name: string;
  addedDate: string;
}

export type ChallengeStatus = 'waitsForConfirm' | 'done' | 'pending' | 'active' | 'closed';
export type ChallengeType = 'oneTime' | 'duration';
export type ChallengeConfirmationType = 'manual' | 'automatic';
export type ChallengeCategory = 'social' | 'financial' | 'sport' | 'other';

export interface Challenge {
  id: string;
  inviter: UserBasic;
  invitee: UserBasic;
  winner: UserBasic;
  loser: UserBasic;
  title: string;
  durationInDays: string;
  type: ChallengeType | null;
  betCategory: ChallengeCategory | null; // TODO add more
  betDetails: any; // TODO
  points: string;
  inviteLink: string;
  proposedChanges: any; // TODO
  status: ChallengeStatus | null;
  confirmationPhotos: string[];
  confirmationType: ChallengeConfirmationType | null;
}

export type CharityCategory = 'kids' | 'animals' | 'environment' | 'other';

export interface Charity {
  id: string;
  logo: string;
  name: string;
  link: string;
  description: string;
  image: string;
  category: CharityCategory | '';
}

export type TaskStatus = 'active' | 'rewarded' | 'expired';
export type TaskCategory = 'friends' | 'challenge' | 'other'; // TODO

export interface Task {
  id: string;
  name: string;
  description: string;
  points: number;
  expirationDate: string;
  finishDate: string;
  category: TaskCategory;
  status: TaskStatus;
}

export type NotificationStatus = 'active' | 'seen';
export type NotificationCategory = 'friends' | 'challenge' | 'other'; // TODO

export interface Notification {
  id: string;
  name: string;
  description: string;
  points: number;
  category: NotificationCategory;
  status: NotificationStatus;
}

export interface Invitation {
  id: string;
  referralCode: string;
  invitee: UserBasic;
  inviter: UserBasic;
}

export interface InvitationForChallenge extends Invitation {
  challenge: Challenge;
}

export interface ChallengeExample {
  id: string;
  title: string;
  durationInDays: string;
  type: ChallengeType | null;
  points: string;
}

// collections

// 1. Challenges -> any subcollections? Challenges / Invitations / invitations where inviter == userId. Challenges where inviter === userId || invitee === userId.
// 2. Users
// 3. Challenge Examples
// 4. Charities
// 5. Invitations?
// 6.