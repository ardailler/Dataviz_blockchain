import Vue from 'vue'
import Router from 'vue-router'
import MainContainer from '@/components/pages/MainContainer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainContainer',
      component: MainContainer
    }
  ]
})
