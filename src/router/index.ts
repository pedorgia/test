import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/TODOListView.vue'),
      props: true
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('../views/TODODetailsView.vue'),
      props: true
    }
  ]
})

export default router
