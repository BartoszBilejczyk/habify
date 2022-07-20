import {
  BetCategory,
  ChallengeConfirmationType,
  ChallengeStatus,
  ChallengeType,
  CharityCategory,
  NotificationCategory,
  NotificationStatus,
  NotificationAction,
  TaskCategory,
  TaskStatus,
} from '../types';
import { i18n } from '../i18n';

interface Constant<T> {
  label: string;
  value: T;
}

export const CHALLENGE_TYPES: Record<ChallengeType, Constant<ChallengeType>> = {
  oneTime: {
    label: i18n.global.t('challenge.types.oneTime'),
    value: 'oneTime',
  },
  duration: {
    label: i18n.global.t('challenge.types.duration'),
    value: 'duration',
  },
};

export const CHALLENGE_STATUS: Record<ChallengeStatus, Constant<ChallengeStatus>> = {
  waitsForConfirm: {
    label: i18n.global.t('challenge.status.waitsForConfirm'),
    value: 'waitsForConfirm',
  },
  done: {
    label: i18n.global.t('challenge.status.done'),
    value: 'done',
  },
  pending: {
    label: i18n.global.t('challenge.status.pending'),
    value: 'pending',
  },
  active: {
    label: i18n.global.t('challenge.status.active'),
    value: 'active',
  },
  closed: {
    label: i18n.global.t('challenge.status.closed'),
    value: 'closed',
  },
};

export const BET_CATEGORY: Record<BetCategory, Constant<BetCategory>> = {
  social: {
    label: i18n.global.t('challenge.categories.social'),
    value: 'social',
  },
  financial: {
    label: i18n.global.t('challenge.categories.financial'),
    value: 'financial',
  },
  sport: {
    label: i18n.global.t('challenge.categories.sport'),
    value: 'sport',
  },
  other: {
    label: i18n.global.t('challenge.categories.other'),
    value: 'other',
  },
};

export const CHALLENGE_CONFIRMATION_TYPE: Record<ChallengeConfirmationType, Constant<ChallengeConfirmationType>> = {
  manual: {
    label: i18n.global.t('challenge.confirmationTypes.manual'),
    value: 'manual',
  },
  automatic: {
    label: i18n.global.t('challenge.confirmationTypes.automatic'),
    value: 'automatic',
  },
};

export const CHARITY_CATEGORY: Record<CharityCategory, CharityCategory> = {
  kids: 'kids',
  animals: 'animals',
  environment: 'environment',
  other: 'other',
};

export const TASK_STATUS: Record<TaskStatus, TaskStatus> = {
  active: 'active',
  rewarded: 'rewarded',
  expired: 'expired',
};

export const TASK_CATEGORY: Record<TaskCategory, TaskCategory> = {
  friends: 'friends',
  challenge: 'challenge',
  other: 'other',
};

export const NOTIFICATION_STATUS: Record<NotificationStatus, NotificationStatus> = {
  active: 'active',
  seen: 'seen',
  dismissed: 'dismissed',
};

export const NOTIFICATION_CATEGORY: Record<NotificationCategory, Constant<NotificationCategory>> = {
  friends: {
    label: i18n.global.t('notifications.categories.friends'),
    value: 'friends',
  },
  challenge: {
    label: i18n.global.t('notifications.categories.challenge'),
    value: 'challenge',
  },
  other: {
    label: i18n.global.t('notifications.categories.other'),
    value: 'other',
  },
};

export const NOTIFICATION_ACTION: Record<NotificationAction, Constant<NotificationAction>> = {
  acceptChallenge: {
    label: i18n.global.t('notifications.actions.acceptChallenge'),
    value: 'acceptChallenge',
  },
  refuseChallenge: {
    label: i18n.global.t('notifications.actions.refuseChallenge'),
    value: 'refuseChallenge',
  },
  showInvite: {
    label: i18n.global.t('notifications.actions.showInvite'),
    value: 'showInvite',
  },
  createNewChallenge: {
    label: i18n.global.t('notifications.actions.createNewChallenge'),
    value: 'createNewChallenge',
  },
  goToChallenge: {
    label: i18n.global.t('notifications.actions.goToChallenge'),
    value: 'goToChallenge',
  },
  goToTaskCenter: {
    label: i18n.global.t('notifications.actions.goToTaskCenter'),
    value: 'goToTaskCenter',
  },
};
