import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Edit from './views/Edit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: Home,
    },
    {
      path: '/edit',
      name: 'edit',
      props: true,
      component: Edit,
    }
  ]
})
