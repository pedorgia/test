import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/TODOList.vue'),
      props: true
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('../components/AddModal.vue'),
      props: true
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('../components/EditModal.vue'),
      props: true
    }
  ]
})

export default router
