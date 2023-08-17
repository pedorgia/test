import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../components/TODOList.vue'),
      props: true
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('../components/AddModal.vue'),
      props: true
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    // {
    //   path: '/inputForm',
    //   name: 'inputForm',
    //   component: () => import('../views/InputView.vue')
    // }
  ]
})

export default router
