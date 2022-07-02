import { createRouter, createWebHistory } from 'vue-router';

export type RouteName =
  | 'home'
  | 'login'
  | 'friends'
  | 'profile'
  | 'active-challenges'
  | 'challenge'
  | 'forgot-password'
  | 'how-it-works'
  | 'new-challenge'
  | 'onboarding'
  | 'challenge-examples'
  | 'profile-challenge-history'
  | 'profile-friends'
  | 'profile-invite'
  | 'profile-settings'
  | 'profile-notification-settings'
  | 'profile-task-center';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('./views/Friends.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/active-challenges',
      name: 'active-challenges',
      component: () => import('./views/ActiveChallenges.vue')
    },
    {
      path: '/challenge',
      name: 'challenge',
      component: () => import('./views/Challenge.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('./views/ForgotPassword.vue')
    },
    {
      path: '/how-it-works',
      name: 'how-it-works',
      component: () => import('./views/HowItWorks.vue')
    },
    {
      path: '/new-challenge',
      name: 'new-challenge',
      component: () => import('./views/NewChallenge.vue')
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('./views/Onboarding.vue')
    },
    {
      path: '/challenge-examples',
      name: 'challenge-examples',
      component: () => import('./views/ChallengeExamples.vue')
    },
    {
      path: '/profile-challenge-history',
      name: 'profile-challenge-history',
      component: () => import('./views/ProfileChallengeHistory.vue')
    },
    {
      path: '/profile-friends',
      name: 'profile-friends',
      component: () => import('./views/ProfileFriendsManagement.vue')
    },
    {
      path: '/profile-invite',
      name: 'profile-invite',
      component: () => import('./views/ProfileInviteFriend.vue')
    },
    {
      path: '/profile-settings',
      name: 'profile-settings',
      component: () => import('./views/ProfileSettings.vue')
    },
    {
      path: '/profile-notification-settings',
      name: 'profile-notification-settings',
      component: () => import('./views/ProfileNotificationSettings.vue')
    },
    {
      path: '/profile-task-center',
      name: 'profile-task-center',
      component: () => import('./views/ProfileTaskCenter.vue')
    }
  ]
});

export default router;
