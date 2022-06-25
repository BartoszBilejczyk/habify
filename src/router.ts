import { createRouter, createWebHistory } from 'vue-router';

export type RouteName = 'home' | 'login' | 'challenges' | 'friends' | 'profile';

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
      path: '/challenges',
      name: 'challenges',
      component: () => import('./views/Challenges.vue')
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
    }
  ]
});

export default router;
