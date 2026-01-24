import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/Views/AuthView.vue'),
    },
    {
      path: '/main',
      component: () => import('@/Views/MainView.vue'),
      children: [
        { path: '', component: '', name: 'main' },
        { path: 'new', component: '' },
      ],
    },
  ],
  history: createWebHistory(),
});
