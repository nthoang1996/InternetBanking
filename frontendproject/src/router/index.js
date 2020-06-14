import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login/Body'
import Dashboard from '../components/Dashboard/Body'
import UserProfile from '../components/Dashboard/UserProfile/UserProfile'
import ListContact from '../components/Dashboard/ListContact/ListContact'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Dashboard,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '',
        component: UserProfile
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '/dashboard/list_contact',
        component: ListContact
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
