import { ChallengeCategory, ChallengeStatus, ChallengeType } from '../types';
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

export const BET_CATEGORY: Record<ChallengeCategory, Constant<ChallengeCategory>> = {
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
