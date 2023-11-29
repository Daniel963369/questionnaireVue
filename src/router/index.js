import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    
    {
      path: '/questionContent',
      name: 'questionContent',
      component: () =>import('../views/questionContent.vue')
    },
    {
      path: '/questionflow',
      name: 'questionflow',
      component: () =>import('../components/questionflow.vue')
    },

    {
      path: '/HomeViewBack',
      name: 'HomeViewBack',
      component: () =>import('../views/HomeViewBack.vue')
    },

    {
      path: '/addPage',
      name: 'addPage',
      component: () =>import('../views/addQuestionnairePage.vue')
    },

    {
      path: '/HomeView',
      name: 'HomeView',
      component: () =>import('../views/HomeView.vue')
    },

  ]
})

export default router
