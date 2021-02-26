import Vue from 'vue'
import VueRouter from 'vue-router'
import Events from '../views/Events.vue'
import Calendar from '../views/Calendar.vue'
import Login from '../views/Login.vue'
//All imports of the Pages and Dependencies

//Router-links for Navigation trough the sites
Vue.use(VueRouter)
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

//router objekt
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router