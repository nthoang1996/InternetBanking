import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login/Body'
import CustomerDashboard from '../components/Dashboard/Customer/Body'
import UserProfile from '../components/Dashboard/Customer/UserProfile'

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
    component: CustomerDashboard,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'aaa',
        component: UserProfile
      }
    ],
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.internetbanking_accesstoken || !localStorage.internetbanking_refreshtoken) {
      next({
        path: '/',
        query: { retUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
export default router
