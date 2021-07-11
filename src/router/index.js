import Vue from 'vue'
import Router from 'vue-router'

import PageDashboard from '../components/pages/PageDashboard'
import PageAbout from '../components/pages/PageAbout'
import Page404 from '../components/pages/Page404'

Vue.use(Router)

const router = new Router({
//   mode: 'history',
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: PageDashboard
    },
    {
      path: '/dashboard/:page',
      name: 'pagination',
      component: PageDashboard
    },
    {
      path: '/add/payment/:description',
      name: 'addPayment',
      component: PageDashboard
    },
    {
      path: '/about',
      name: 'about',
      component: PageAbout
    },
    {
      path: '*',
      name: 'NotFound',
      component: Page404
    }
  ]
})

export default router
