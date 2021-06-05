import Vue from 'vue'
import Router from 'vue-router'

// import PageDashboard from '../components/pages/PageDashboard'
// import PageAbout from '../components/pages/PageAbout'
// import Page404 from '../components/pages/Page404'

Vue.use(Router)

const router = new Router({
//   mode: 'history',
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../components/pages/PageDashboard')
    },
    {
      path: '/dashboard/:page',
      name: 'pagination',
      component: () => import('../components/pages/PageDashboard')
    },
    {
      path: '/add/payment/:description',
      name: 'addPayment',
      component: () => import('../components/pages/PageDashboard')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/pages/PageAbout')
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('../components/pages/Page404')
    }
  ]
})

export default router
