import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Register from '../components/Register'
import Login from '../components/Login'
import Main from '../components/Main'
import Basket from '../components/Basket'
import UserInfo from '../components/UserInfo'
import Orders from '../components/Orders'
import Order from '../components/Order'
import UserOrders from '../components/UserOrders'
import OrderForm from '../components/OrderForm'
import NotFound from '../components/NotFound'











const routes = [
  {
    path: '/',
    name: 'home',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) {
        // Если токен отсутствует, продолжаем навигацию (например, к странице логина)
        next();
      } else {
        if (localStorage.getItem('isAdmin') == 'true') {
          next('/admin');
        } else {
          next('/main');
        }
        // Если токен есть, перенаправляем на страницу "/main"
      }
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: () => {
      if (!localStorage.getItem('token')) {
        return true

      } else {
        return false
      }
    },
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    beforeEnter: (to, from, next) => {

      if (localStorage.getItem('token')) {
        if (localStorage.getItem('isAdmin') !== 'true') {
          // Если токен отсутствует, продолжаем навигацию (например, к странице логина)
          next();
        } else {

          next('/admin');
        }
      } else {

        // Если токен отсутствует, продолжаем навигацию (например, к странице логина)
        next('/');

      }
    }
  },
  {
    path: '/basket',
    name: 'basket',
    component: Basket,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        if (localStorage.getItem('isAdmin') !== 'true') {
          // Если токен отсутствует, продолжаем навигацию (например, к странице логина)
          next();
        } else {

          next('/admin');
        }
      } else {

        // Если токен отсутствует, продолжаем навигацию (например, к странице логина)
        next('/');

      }
    }
  },
  {
    path: '/user',
    name: 'user',
    component: UserInfo,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        if (localStorage.getItem('isAdmin') !== 'true') {
          // Если токен отсутствует, продолжаем навигацию (например, к странице логина)
          next();
        } else {

          next('/admin');
        }
      } else {

        // Если токен отсутствует, продолжаем навигацию (например, к странице логина)
        next('/');

      }
    }
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        if (localStorage.getItem('isAdmin') !== 'true') {
          // Если токен отсутствует, продолжаем навигацию (например, к странице логина)
          next();
        } else {

          next('/admin');
        }

      } else {

        // Если токен отсутствует, продолжаем навигацию (например, к странице логина)
        next('/');

      }
    }
  },

  {
    path: '/order/:id',
    name: 'Order',
    component: Order,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        if (localStorage.getItem('isAdmin') !== 'true') {
          // Если токен отсутствует, продолжаем навигацию (например, к странице логина)
          next();
        } else {
          next('/admin');
        }
      } else {

        // Если токен отсутствует, продолжаем навигацию (например, к странице логина)
        next('/');

      }
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: UserOrders,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        if (localStorage.getItem('isAdmin') == 'true') {
          // Если токен отсутствует, продолжаем навигацию (например, к странице логина)
          next();
        } else {

          next('/admin');
        }
      } else {

        // Если токен отсутствует, продолжаем навигацию (например, к странице логина)
        next('/');

      }
    }
  },
  {
    path: '/admin/order',
    name: 'OrderForm',
    component: localStorage.getItem('isAdmin') == 'true' ? OrderForm : Main,
    beforeEnter: () => {
      return localStorage.getItem('item')
    },
  },
  { path: '/:pathmatch(.*)*', component: NotFound }




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
