import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element' // 引入element-ui
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'

Vue.config.productionTip = false
Axios.defaults.baseURL = 'http://localhost:8889/'
Vue.prototype.$http = Axios // 将axios引入Vue的基本类型$http中

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
