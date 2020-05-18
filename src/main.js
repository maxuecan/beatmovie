import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'
Vue.component('Scroller',Scroller)
Vue.prototype.axios = axios
// 可以用this调用axios
Vue.config.productionTip = false
// 过滤器
// Vue.filter('setWH',(url , arg)=>{
//   return url.replace(/w\.h/,arg);
// })
Vue.component('Loading',Loading)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
