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
    data_sending_des_id: '',
    data_sending_account_name: '',
    data_sending_value: '0',
    data_sending_my_message: '',
    data_sending_bank_company_id:"TttwVLKHvXRujyllDq",
    code_verify: ''
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getCurrentPage(state) {
      return state.current_page;
    },
    getListDashBoard(state) {
      return state.list_dashboard.filter(db => db.display === true);
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
    getDataSendingUserID(state){
      return state.data_sending_des_id;
    },
    getDataSendingMyMessage(state){
      return state.data_sending_my_message;
    },
    getDataSendingAccountName(state){
      return state.data_sending_account_name;
    },
    getDataSendingValue(state){
      return state.data_sending_value;
    },
    getDataSendingBankID(state){
      return state.data_sending_bank_company_id;
    },
    getCodeVerify(state){
      return state.code_verify;
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
      state.list_dashboard = [{id:1, name: "Thông tin cá nhân", url:"/dashboard", class:"fa fa-user-circle", display: true}];
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
    UPDATE_DATA_SENDING_USER_ID(state, payload){
      state.data_sending_des_id = payload;
    },
    UPDATE_DATA_SENDING_ACCOUNT_NAME(state, payload){
      state.data_sending_account_name = payload;
    },
    UPDATE_DATA_SENDING_VALUE(state, payload){
      state.data_sending_value = payload;
    },
    UPDATE_DATA_SENDING_MY_MESSAGE(state, payload){
      state.data_sending_my_message = payload;
    },
    UPDATE_DATA_SENDING_BANK_ID(state, payload){
      state.data_sending_bank_company_id = payload;
    },
    UPDATE_CODE_VERIFY(state, payload){
      state.code_verify = payload;
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
    updateDataSendingUserID(ctx, query){
      ctx.commit('UPDATE_DATA_SENDING_USER_ID', query);
    },
    updateDataSendingAccountName(ctx, query){
      ctx.commit('UPDATE_DATA_SENDING_ACCOUNT_NAME', query);
    },
    updateDataSendingValue(ctx, query){
      ctx.commit('UPDATE_DATA_SENDING_VALUE', query);
    },
    updateDataSendingMyMessage(ctx, query){
      ctx.commit('UPDATE_DATA_SENDING_MY_MESSAGE', query);
    },
    updateDataSendingBankID(ctx, query){
      ctx.commit('UPDATE_DATA_SENDING_BANK_ID', query);
    },
    updateCodeVerify(ctx, query){
      ctx.commit('UPDATE_CODE_VERIFY', query);
    }

  },
  modules: {
  }
})
