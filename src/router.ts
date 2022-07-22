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
      meta: { gtm: 'Auth Start' },
      component: () => import('./views/AuthStart.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: { gtm: 'Login' },
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: { gtm: 'Register' },
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/friends',
      name: 'friends',
      meta: { gtm: 'Friends' },
      component: () => import('./views/Friends.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {
        gtm: 'Profile',
        title: 'Profile Page Name',
        metaTags: [
          {
            name: 'description',
            content: 'The Profile page of our example app.',
          },
          {
            property: 'og:description',
            content: 'The Profile page of our example app.',
          },
        ],
      },
      component: () => import('./views/Profile.vue'),
    },
    {
      path: '/',
      name: 'active-challenges',
      meta: {
        gtm: 'Active Challenges',
        title: 'Challenges Page - Example App',
        metaTags: [
          {
            name: 'description',
            content: 'The Challenges page of our example app.',
          },
          {
            property: 'og:description',
            content: 'The Challenges page of our example app.',
          },
        ],
      },
      component: () => import('./views/ActiveChallenges.vue'),
    },
    {
      path: '/challenge/:id',
      name: 'challenge',
      meta: { gtm: 'Challenge' },
      component: () => import('./views/Challenge.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      meta: { gtm: 'Forgot Password' },
      component: () => import('./views/ForgotPassword.vue'),
    },
    {
      path: '/how-it-works',
      name: 'how-it-works',
      meta: { gtm: 'How It Works' },
      component: () => import('./views/HowItWorks.vue'),
    },
    {
      path: '/new-challenge',
      name: 'new-challenge',
      meta: { gtm: 'New Challenge' },
      component: () => import('./views/NewChallenge.vue'),
    },
    {
      path: '/new-challenge-success',
      name: 'new-challenge-success',
      meta: { gtm: 'New Challenge Success' },
      component: () => import('./views/NewChallengeSuccess.vue'),
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      meta: { gtm: 'Onboarding' },
      component: () => import('./views/Onboarding.vue'),
    },
    {
      path: '/challenge-examples',
      name: 'challenge-examples',
      meta: { gtm: 'Challenge Examples' },
      component: () => import('./views/ChallengeExamples.vue'),
    },
    {
      path: '/profile-challenge-history',
      name: 'profile-challenge-history',
      meta: { gtm: 'Profile Challenge History' },
      component: () => import('./views/ProfileChallengeHistory.vue'),
    },
    {
      path: '/profile-invite',
      name: 'profile-invite',
      meta: { gtm: 'Profile Invite' },
      component: () => import('./views/ProfileInviteFriend.vue'),
    },
    {
      path: '/profile-preferences',
      name: 'profile-preferences',
      meta: { gtm: 'Profile Preferences' },
      component: () => import('./views/ProfilePreferences.vue'),
    },
    {
      path: '/profile-notification-settings',
      name: 'profile-notification-settings',
      meta: { gtm: 'Profile Notification Settings' },
      component: () => import('./views/ProfileNotificationSettings.vue'),
    },
    {
      path: '/profile-task-center',
      name: 'profile-task-center',
      meta: { gtm: 'Profile Task Center' },
      component: () => import('./views/ProfileTaskCenter.vue'),
    },
    {
      path: '/donate',
      name: 'donate',
      meta: { gtm: 'Donate' },
      component: () => import('./views/Donate.vue'),
    },
    {
      path: '/charities',
      name: 'charities',
      meta: { gtm: 'Charities' },
      component: () => import('./views/Charities.vue'),
    },
    {
      path: '/invite',
      name: 'invite',
      meta: { gtm: 'Invite' },
      component: () => import('./views/Invitation.vue'),
    },
    {
      path: '/components',
      name: 'components',
      meta: { gtm: 'Components' },
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
