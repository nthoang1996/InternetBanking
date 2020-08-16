import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "font-awesome/css/font-awesome.min.css";
import router from './router'
import VModal from 'vue-js-modal'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
 
Vue.use(VModal)
Vue.use(VueSweetalert2);

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
