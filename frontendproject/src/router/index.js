import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login/Body'
import Dashboard from '../components/Dashboard/Body'
import UserProfile from '../components/Dashboard/UserProfile/UserProfile'
import ListContact from '../components/Dashboard/ListContact/ListContact'
import NewContact from '../components/Dashboard/ListContact/NewContact'
import ListHistory from '../components/Dashboard/History/ListHistory'
import store from '../store/index'
import data from '../assets/info.json'
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
      console.log(to.fullPath);
      const permitRoute = data.dashboard.find(elememt => elememt.role == parseInt(store.getters.getCurrentRole)).elements;
      const object = permitRoute.find((element) => (element.url == to.path));
      if (!object && to.fullPath != '/dashboard') {
        alert("Tài nguyên hiện tại không được hỗ trợ đối với tài khoản của bạn. Vui lòng đăng nhập lại tài khoản có quyền truy cập tới tài nguyên này hoặc kiểm tra lại url");
        next({
          path: '/',
          
        })
      }
      else{
        next() // make sure to always call next()!
      }
    }
  }
  else{
    next();
  }
})
export default router
