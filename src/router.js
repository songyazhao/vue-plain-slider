import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Basic from './views/Demo/Basic.vue'
import Full from './views/Demo/Full.vue'
import LeftSliderDelete from './views/Demo/LeftSliderDelete.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/Basic',
      name: 'Basic',
      component: Basic
    },
    {
      path: '/Full',
      name: 'Full',
      component: Full
    },
    {
      path: '/LeftSliderDelete',
      name: 'LeftSliderDelete',
      component: LeftSliderDelete
    }
  ]
})
