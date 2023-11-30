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

    {
      path: '/answerPage',
      name: 'answerPage',
      component: () =>import('../views/answerPage.vue')
    },

  ]
})

export default router
