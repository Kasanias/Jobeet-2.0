import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Offers from '../views/Offers.vue'
import store from '../store';
import { auth, db } from '@/main'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/profile/:name',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/offers',
    name: 'Offers',
    component: Offers
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    let user = store.getters.getUser
    console.log("current", user)
    if (user) {
      next();
    } else {
      next({ path: '/login' });
    }
  }
  next();
});

export default router
