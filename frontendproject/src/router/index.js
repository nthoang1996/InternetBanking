import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login/Body'
import CustomerDashboard from '../components/CustomerDashboard/Body'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
  {
    path: '/customer_dashboard',
    name: 'CustomerDashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: CustomerDashboard
  }
]

const router = new VueRouter({
  routes
})

export default router
