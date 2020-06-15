import Vue from 'vue'
import Vuex from 'vuex'
import data from "../assets/info.json";
import myMixin from '../Mixin';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    list_dashboard: [],
    current_page: '',
    userVisible: {},
    listAccount: [],
    listContact: [],
    accountQuery: '',
    data_sending : {}
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
    },
    getListContact(state){
      if (state.accountQuery.length === 0) {
        return state.listContact;
      }

      const lcQuery = state.accountQuery.toLocaleLowerCase();
      return state.listContact.filter(
        t => t.name_contact.toLocaleLowerCase().includes(lcQuery)
      );
    },
    getDataSending(state){
      console.log("AAAA",JSON.parse(JSON.stringify(state.dataSending)));
      return state.dataSending;
    }
  },
  mutations: {
    INIT_USER(state, payload) {
      state.user = payload;
    },
    SET_CURRENT_PAGE(state, query){
      if(state.list_dashboard.length !== 0){
        state.current_page = state.list_dashboard.find(element=>element.url === query).name;
      }
    },
    SET_DASHBOARD(state, payload){
      state.list_dashboard = [{id:1, name: "Thông tin cá nhân", url:"/dashboard", class:"fa fa-user-circle"}];
      state.list_dashboard = [...state.list_dashboard, ...payload];
    },
    GET_LIST_ACCOUNT(state, payload){
      state.listAccount = [...payload];
    },
    SET_LIST_CONTACT(state, payload){
      state.listContact = [...payload];
    },
    UPDATE_QUERY(state, payload){
      state.accountQuery = payload;
    },
    UPDATE_DATA_SENDING(state, data){
      console.log(data);
      state.dataSending[data.key]= data.value;
    },
    INIT_DATA_SENDING(state){
      state.dataSending = {
        des_id: "",
        account_name:"",
        value:"0",
        my_message: '',
        bank_company_id: "TttwVLKHvXRujyllDq"
      }
      console.log("AAAAAA");
    }
  },
  actions: {
    async initSidebar(ctx) {
      await myMixin.methods.handleBeforeCallServer();
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
      const url = 'http://localhost:3000/customer/saving_account';
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
    },
    async setListContact(ctx){
      await myMixin.methods.handleBeforeCallServer();
      const url = 'http://localhost:3000/customer/user_contact';
      return fetch(url, {
        method: 'get', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'x-access-token': localStorage.internetbanking_accesstoken
        },
      }).then(response => response.json())
      .then(json => {
        console.log(json);
        ctx.commit('SET_LIST_CONTACT', json.data);
      });
    },
    updateQuery(ctx, query){
      ctx.commit('UPDATE_QUERY', query);
    },
    updateDataSending(ctx, data){
      ctx.commit('UPDATE_DATA_SENDING', data);
    },
    initDataSending(ctx){
      ctx.commit('INIT_DATA_SENDING');
    }
  },
  modules: {
  }
})
