import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.prototype.axios = axios
// 可以用this调用axios
Vue.config.productionTip = false
// 过滤器
// Vue.filter('setWH',(url , arg)=>{
//   return url.replace(/w\.h/,arg);
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
