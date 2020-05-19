import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.prototype.axios = axios

import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller)

// 可以用this调用axios
Vue.config.productionTip = false
// 过滤器
// Vue.filter('imgesfilter',function(path){
//     return path.replace('w.h','148.208')
// })

import Loading from '@/components/Loading'
Vue.component('Loading',Loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
