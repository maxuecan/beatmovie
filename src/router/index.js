import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import mineRouter from './mine'
import cinemaRouter from './cinema'
Vue.use(VueRouter)

  const routes = [
  movieRouter,
  mineRouter,
  cinemaRouter,
  {
    path : '/*',
    redirect :'/movie/nowplaying'
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base : 'BM',
  routes
})

export default router
