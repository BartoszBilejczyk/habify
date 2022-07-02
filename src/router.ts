import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Friends from './views/Friends.vue';
import Profile from './views/Profile.vue';
import ActiveChallenges from './views/ActiveChallenges.vue';
import Challenge from './views/Challenge.vue';
import ForgotPassword from './views/ForgotPassword.vue';
import HowItWorks from './views/HowItWorks.vue';
import NewChallenge from './views/NewChallenge.vue';
import Onboarding from './views/Onboarding.vue';
import ChallengeExamples from './views/ChallengeExamples.vue';
import ProfileChallengeHistory from './views/ProfileChallengeHistory.vue';
import ProfileFriendsManagement from './views/ProfileFriendsManagement.vue';
import ProfileInviteFriend from './views/ProfileInviteFriend.vue';
import ProfileSettings from './views/ProfileSettings.vue';
import ProfileNotificationSettings from './views/ProfileNotificationSettings.vue';
import ProfileTaskCenter from './views/ProfileTaskCenter.vue';

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
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/friends',
      name: 'friends',
      component: Friends
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/active-challenges',
      name: 'active-challenges',
      component: ActiveChallenges
    },
    {
      path: '/challenge',
      name: 'challenge',
      component: Challenge
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword
    },
    {
      path: '/how-it-works',
      name: 'how-it-works',
      component: HowItWorks
    },
    {
      path: '/new-challenge',
      name: 'new-challenge',
      component: NewChallenge
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: Onboarding
    },
    {
      path: '/challenge-examples',
      name: 'challenge-examples',
      component: ChallengeExamples
    },
    {
      path: '/profile-challenge-history',
      name: 'profile-challenge-history',
      component: ProfileChallengeHistory
    },
    {
      path: '/profile-friends',
      name: 'profile-friends',
      component: ProfileFriendsManagement
    },
    {
      path: '/profile-invite',
      name: 'profile-invite',
      component: ProfileInviteFriend
    },
    {
      path: '/profile-settings',
      name: 'profile-settings',
      component: ProfileSettings
    },
    {
      path: '/profile-notification-settings',
      name: 'profile-notification-settings',
      component: ProfileNotificationSettings
    },
    {
      path: '/profile-task-center',
      name: 'profile-task-center',
      component: ProfileTaskCenter
    }
  ]
});

export default router;
