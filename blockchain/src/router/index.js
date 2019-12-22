import Vue from 'vue'
import Router from 'vue-router'
import MainContainer from '@/components/pages/MainContainer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.VUE_APP_URL,
  routes: [
    {
      path: '/',
      name: 'MainContainer',
      component: MainContainer
    }
  ]
})
