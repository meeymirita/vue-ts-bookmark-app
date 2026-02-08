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
        {
          path: '',
          component: () => import('@/Views/IndexView.vue'),
          name: 'main',
        },
        {
          path: ':alias',
          component: () => import('@/Views/CategoryView.vue'),
        },
      ],
    },
  ],
  history: createWebHistory(),
});
