import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login/Body";
import Dashboard from "../components/Dashboard/Body";
import UserProfile from "../components/Dashboard/UserProfile/UserProfile";
import ListContact from "../components/Dashboard/ListContact/ListContact";
import NewContact from "../components/Dashboard/ListContact/NewContact";
import ListHistory from "../components/Dashboard/History/ListHistory";
import CreateAccount from "../components/MyAccount/CreateAccount";
import ListAccount from "../components/MyAccount/ListAccount/ListAccount";
import RechargeAccount from "../components/MyAccount/RechargeAccount/RechargeAccount";
import ChangePassword from "../components/Dashboard/ChangePassword.vue";
import ManageDebit from "../components/Dashboard/ManageDebit/ManageDebit.vue";
import HistoryTransfer from "../components/MyAccount/HistoryTransfer/HistoryTransfer";
import CreateDebtReminder from "../components/Dashboard/ManageDebit/CreateDebtReminder.vue";
import ManageEmployee from "../components/Admin/ManageEmployee/ManageEmployee.vue";
import CreateEmployee from "../components/Admin/CreateAccount/CreateEmployee.vue";
import EditEmployee from "../components/Admin/EditAccount/EditAccount.vue";
import RetrievePassword from "../components/RetrievePassword/RetrievePassword.vue";
import CreateNewPassword from "../components/RetrievePassword/CreateNewPassword.vue";
import TransactionInformation from "../components/Dashboard/ManageDebit/TransactionInformation.vue";
import MineDebtReminder from "../components/Dashboard/ManageDebit/MineDebtReminder.vue"
import TotalTransfer from "../components/Admin/Chart/Chart.vue"
import store from "../store/index";
import data from "../assets/info.json";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/retrieve_password",
    name: "Retrieve Password",
    component: RetrievePassword,
    children: [
      {
        path: "/retrieve_password/create_newPassword",
        component: CreateNewPassword,
      },
    ],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Dashboard,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "",
        component: UserProfile,
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "/dashboard/list_contact",
        component: ListContact,
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "/dashboard/add_new_contact",
        component: NewContact,
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "/dashboard/edit_contact",
        component: NewContact,
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "/dashboard/list_history",
        component: ListHistory,
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "/employee/create_customer_account",
        component: CreateAccount,
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "/employee/list_customer_account",
        component: ListAccount,
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "/employee/recharge_customer_account",
        component: RechargeAccount,
      },
      {
        path: "/dashboard/change_password",
        component: ChangePassword,
      },
      {
        path: "/dashboard/manage_debit",
        component: ManageDebit,
      },
      {
        path: "/dashboard/transaction_information",
        component: TransactionInformation,
      },
      {
        path: "/dashboard/create_debt_reminder",
        component: CreateDebtReminder,
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "/employee/historty_transfer_customer_account",
        component: HistoryTransfer,
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "/admin/manage_employee",
        component: ManageEmployee,
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "/admin/create_account_employee",
        component: CreateEmployee,
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '/admin/edit_account_employee',
        component: EditEmployee
      },
      {
        path: "/dashboard/mine_debt_reminder",
        component: MineDebtReminder
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '/admin/total_transfer_bank',
        component: TotalTransfer
      }
    ],
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (
      !localStorage.internetbanking_accesstoken ||
      !localStorage.internetbanking_refreshtoken
    ) {
      next({
        path: "/",
        query: { retUrl: to.fullPath },
      });
    } else {
      console.log(to.fullPath);
      const permitRoute = data.dashboard.find(
        (elememt) => elememt.role == parseInt(store.getters.getCurrentRole)
      ).elements;
      const object = permitRoute.find((element) => element.url == to.path);
      if (!object && to.fullPath != "/dashboard") {
        alert(
          "Tài nguyên hiện tại không được hỗ trợ đối với tài khoản của bạn. Vui lòng đăng nhập lại tài khoản có quyền truy cập tới tài nguyên này hoặc kiểm tra lại url"
        );
        next({
          path: "/",
        });
      } else {
        next(); // make sure to always call next()!
      }
    }
  } else {
    next();
  }
});
export default router;
