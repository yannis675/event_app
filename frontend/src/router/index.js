/* Author: Y.Anderegg
Date: 17.03.2021
Topic: Eventmanager IPA 2021 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Events from '../views/Events.vue'
import Calendar from '../views/Calendar.vue'
import Login from '../views/Login.vue'
//All imports of the Pages and Dependencies

//ROUTER-links for Navigation trough the sites
Vue.use(VueRouter)
  //Object contains Routes with Parameters
  const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/Login'
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

//ROUTER object
const ROUTER = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default ROUTER