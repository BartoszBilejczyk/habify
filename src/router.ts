import { createRouter, createWebHistory } from 'vue-router';

export type RouteName =
  | 'home'
  | 'auth-start'
  | 'login'
  | 'register'
  | 'profile'
  | 'active-challenges'
  | 'challenge'
  | 'forgot-password'
  | 'how-it-works'
  | 'new-challenge'
  | 'new-challenge-success'
  | 'onboarding'
  | 'challenge-examples'
  | 'profile-challenge-history'
  | 'friends'
  | 'profile-invite'
  | 'profile-preferences'
  | 'profile-notification-settings'
  | 'profile-task-center'
  | 'donate'
  | 'components'
  | 'leaderboard'
  | 'charities';

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
  routes: [
    {
      path: '/auth-start',
      name: 'auth-start',
      component: () => import('./views/AuthStart.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('./views/Friends.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue'),
    },
    {
      path: '/',
      name: 'active-challenges',
      component: () => import('./views/ActiveChallenges.vue'),
    },
    {
      path: '/challenge/:id',
      name: 'challenge',
      component: () => import('./views/Challenge.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('./views/ForgotPassword.vue'),
    },
    {
      path: '/how-it-works',
      name: 'how-it-works',
      component: () => import('./views/HowItWorks.vue'),
    },
    {
      path: '/new-challenge',
      name: 'new-challenge',
      component: () => import('./views/NewChallenge.vue'),
    },
    {
      path: '/new-challenge-success',
      name: 'new-challenge-success',
      component: () => import('./views/NewChallengeSuccess.vue'),
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('./views/Onboarding.vue'),
    },
    {
      path: '/challenge-examples',
      name: 'challenge-examples',
      component: () => import('./views/ChallengeExamples.vue'),
    },
    {
      path: '/profile-challenge-history',
      name: 'profile-challenge-history',
      component: () => import('./views/ProfileChallengeHistory.vue'),
    },
    {
      path: '/profile-invite',
      name: 'profile-invite',
      component: () => import('./views/ProfileInviteFriend.vue'),
    },
    {
      path: '/profile-preferences',
      name: 'profile-preferences',
      component: () => import('./views/ProfilePreferences.vue'),
    },
    {
      path: '/profile-notification-settings',
      name: 'profile-notification-settings',
      component: () => import('./views/ProfileNotificationSettings.vue'),
    },
    {
      path: '/profile-task-center',
      name: 'profile-task-center',
      component: () => import('./views/ProfileTaskCenter.vue'),
    },
    {
      path: '/donate',
      name: 'donate',
      component: () => import('./views/Donate.vue'),
    },
    {
      path: '/charities',
      name: 'charities',
      component: () => import('./views/Charities.vue'),
    },
    {
      path: '/invite',
      name: 'invite',
      component: () => import('./views/Invitation.vue'),
    },
    {
      path: '/components',
      name: 'components',
      component: () => import('./views/Components.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => {
        return '/';
      },
    },
  ],
});

export default router;
