import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Register from '../components/Register'
import Login from '../components/Login'
import Main from '../components/Main'
import Basket from '../components/Basket'





const routes = [
  {
    path: '/',
    name: 'home',
    component: !localStorage.getItem('token') ? Register : Main
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  }, 
  {
    path: '/basket',
    name: 'basket',
    component: Basket
  },


  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
