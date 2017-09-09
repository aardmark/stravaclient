import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import AthleteDetails from '@/components/AthleteDetails'
import ActivityDetails from '@/components/ActivityDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/athlete/:id',
      name: 'AthleteDetails',
      component: AthleteDetails,
      props: true
    },
    {
      path: '/activities/:id',
      name: 'ActivityDetails',
      component: ActivityDetails,
      props: true
    }
  ]
})
