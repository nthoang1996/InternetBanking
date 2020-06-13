import Vue from 'vue'
import Vuex from 'vuex'
import data from "../assets/info.json";
import myMixin from '../Mixin';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    current_page: '',
    list_dashboard: [],
    userVisible: {},
    listAccount: []
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getCurrentPage(state) {
      return state.current_page;
    },
    getListDashBoard(state) {
      return state.list_dashboard;
    },
    getUserVisible(state) {
      state.userVisible = {...state.user};
      delete state.userVisible.id;
      delete state.userVisible.role;
      return state.userVisible;
    },
    getListAccount(state){
      return state.listAccount;
    }
  },
  mutations: {
    INIT_USER(state, payload) {
      state.user = payload;
    },
    SET_CURRENT_PAGE(state, query){
      state.current_page = state.list_dashboard.find(element=>element.url === query).name;
    },
    SET_DASHBOARD(state, payload){
      state.list_dashboard = [{id:1, name: "Thông tin cá nhân", url:"/dashboard", class:"fa fa-user-circle"}];
      state.list_dashboard = [...state.list_dashboard, ...payload];
    },
    GET_LIST_ACCOUNT(state, payload){
      state.listAccount = [...payload];
    }
  },
  actions: {
    async initSidebar(ctx) {
      await myMixin.methods.handleBeforeCallServer();
      console.log(localStorage.internetbanking_accesstoken);
      const url = 'http://localhost:3000/general/get_user_login_info'
      return fetch(url, {
        method: 'get', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'x-access-token': localStorage.internetbanking_accesstoken
        },
      }).then(response => response.json())
      .then(json => {
        console.log(json);
        ctx.commit('INIT_USER', json.user);
      });      
    },
    setCurrentPage(ctx, query){
      ctx.commit('SET_CURRENT_PAGE', query);
    },
    setDashBoard(ctx){
      let listDashBoard = data.dashboard.find(element => element.role === this.state.user.role).elements;
      ctx.commit('SET_DASHBOARD', listDashBoard);
    },
    async getListAccount(ctx){
      await myMixin.methods.handleBeforeCallServer();
      console.log(localStorage.internetbanking_accesstoken);
      const url = 'http://localhost:3000/customer/saving_account'
      return fetch(url, {
        method: 'get', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'x-access-token': localStorage.internetbanking_accesstoken
        },
      }).then(response => response.json())
      .then(json => {
        console.log(json);
        ctx.commit('GET_LIST_ACCOUNT', json.data);
      });   
    }
  },
  modules: {
  }
})
