import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element' // 引入element-ui
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import Sequelize from 'sequelize' // 导入Sequelize库，用以koa与mysql
import mysqlConfig from '../server/config/mysqlConfig' // koa控制mysql的基本驱动

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
