import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login/Body'
import Dashboard from '../components/Dashboard/Body'
import UserProfile from '../components/Dashboard/UserProfile/UserProfile'
import ListContact from '../components/Dashboard/ListContact/ListContact'
import NewContact from '../components/Dashboard/ListContact/NewContact'
import ListHistory from '../components/Dashboard/History/ListHistory'

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
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '/dashboard/add_new_contact',
        component: NewContact
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '/dashboard/edit_contact',
        component: NewContact
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '/dashboard/list_history',
        component: ListHistory
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '/dashboard/create_customer_account',
        component: ListHistory
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
