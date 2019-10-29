import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Welcome from "../views/Welcome.vue"
import Profile from "../views/Profile.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Home
  },
  {
    path: '/profile/:email',
    name: 'profile',
    component: Profile
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
