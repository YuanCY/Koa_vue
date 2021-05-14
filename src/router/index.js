import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Welcome from '../components/Welcome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login' // redirect重新定向
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  }
]

const router = new VueRouter({
  routes
})

export default router
