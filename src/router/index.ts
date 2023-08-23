import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/TODOListView.vue'),
      props: true
    },
    {
      path: '/details/:id',
      name: 'details',
      component: () => import('../views/TODODetailsView.vue'),
      props: true
    }
  ]
})

export default router
