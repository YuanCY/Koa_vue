import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Welcome from '../components/Welcome.vue'
import Registered from '../components/Registered.vue'
import Background from '../components/background/Background.vue'
import UserList from '../components/background/UserList.vue'
import Article from '../components/article/Article.vue'
import AddArticle from '../components/article/addArticle.vue'
import EditArticle from '../components/article/editArticle.vue'

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
  },
  {
    path: '/registered',
    name: 'Registered',
    component: Registered
  },
  {
    path: '/background',
    name: 'Background',
    component: Background,
    children: [
      { path: '/userlist', name: 'UserList', component: UserList },
      { path: '/article', name: 'Article', component: Article },
      { path: '/addarticle', name: 'AddArticle', component: AddArticle },
      { path: '/editarticle/:id', name: 'EditArticle', component: EditArticle }
    ]
  }
]

const router = new VueRouter({
  routes
})
/**
 * 导航守护，这个是用来用户点击其他路径时，如果没有token，那么就强制将页面去到login页面，如果有token说明已经完成登陆。
 */
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转而来
  // next 是一个函数，表示放行，next()放行，或者next('/login')
  if (to.path === '/login' || to.path === '/registered') return next() // 如果路径是去login登陆页面，那么就直接返回放行
  const token = window.sessionStorage.getItem('token') // 获取token
  if (!token) { // 如果token不存在
    next('/login')
  } else { // else说明token存在，那么就next()放行
    // Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
    Vue.prototype.$http.defaults.headers.common.Authorization = 'Bearer ' + token
    console.log('token存在')
    console.log(Vue.prototype.$http.defaults.headers.common.Authorization)
    next()
  }
})

export default router
