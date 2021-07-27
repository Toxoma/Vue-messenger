import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Autorize.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  }
  ,
  {
    path: '/recower',
    name: 'RecowerPassword',
    component: () => import('../views/RecowerPassword.vue')
  }
  ,
  {
    path: '/mainPage',
    name: 'MainPage',
    component: () => import('../views//MainPage.vue')
  }
  ,
  {
    path: '/new-password',
    name: 'NewPassword',
    component: () => import('../views//NewPassword.vue')
  },
  {
    path: '/congratulation',
    name: 'Congratulation',
    component: () => import('../views//Congratulation.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
