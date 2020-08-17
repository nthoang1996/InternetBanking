import Vue from 'vue'
import Vuex from 'vuex'
import data from "../assets/info.json";
import myMixin from '../Mixin';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    currentRole: 3,
    list_dashboard: [],
    current_page: '',
    userVisible: {},
    listAccount: [],
    listContact: [],
    listDebit: [],
    accountQuery: '',
    debitQuery:'',
    historyQuery: '',
    data_sending_des_id: '',
    data_sending_account_name: '',
    data_sending_value: '0',
    data_sending_my_message: '',
    data_sending_bank_company_id:"TttwVLKHvXRujyllDq",
    data_sending_type_payment: 1,
    id_contact_selected: '',
    code_verify: '',
    modalType: 1,
    listHistory: [],
    account_number:'',
    bankID:'',
    customerName:'',
    debtMessage:'',
    moneyNumber: '0', 
    listAccountCustomer:[],
    accountCustomerQuery: '',
    listHistoryTransferQuery: '',
    accountCustomerActive: [],
    listHistoryAccountCustomer: [],
    listAccountEmployee: [],
    accountEmployeeActive: [],
    emailRetrievePassword:'',
    debtID : '',

    listTotalTransaction: {}
  },
  getters: {
    getDebtID(state){
      return state.debtID;
    },
    getEmailRetrievePassword(state){
      return state.emailRetrievePassword;
    },
    getDebtMessage(state){
      return state.debtMessage;
    },
    getMoneyNumber(state){
      return state.moneyNumber;
    },
    getCustomerName(state){
      return state.customerName;
    },
    getBankID(state){
      return state.bankID;
    },
    getAccountNumber(state){
      return state.account_number;
    },
    getUser(state) {
      return state.user;
    },
    getCurrentRole(state){
      return state.currentRole;
    },
    getCurrentPage(state) {
      return state.current_page;
    },
    getListDashBoard(state) {
      return state.list_dashboard.filter(db => db.display === true);
    },
    getUserVisible(state) {
      state.userVisible = {...state.user};
      state.currentRole = state.user.role;
      if(state.userVisible.role != 3){
        delete state.userVisible.bank_balance;
      }
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
    // Bổ sung search theo stk người nhận sau.
    getListDebit(state){
      if (state.debitQuery.length === 0) {
        return state.listDebit;
      }

      const lcQuery = state.debitQuery.toLocaleLowerCase();
      return state.listDebit.filter(
        t => t.source_name.toLocaleLowerCase().includes(lcQuery)
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
    getDataSendingTypePayment(state){
      return state.data_sending_type_payment;
    },
    getCodeVerify(state){
      return state.code_verify;
    },
    getIdContactSelected(state){
      return state.id_contact_selected;
    },
    getModalType(state){
      return state.modalType;
    },
    getListHistory(state){
      if (state.historyQuery.length === 0) {
        return state.listHistory;
      }

      const lcQuery = state.historyQuery.toLocaleLowerCase();
      return state.listHistory.filter(
        t => t.displayName.toLocaleLowerCase().includes(lcQuery)
      );
    },
    getListAccountCustomer(state){
      if(state.accountCustomerQuery.length === 0){
        return state.listAccountCustomer;
      }
      
      const lcQuery = state.accountCustomerQuery.toLocaleLowerCase();
      console.log(state.listAccountCustomer);
      return state.listAccountCustomer.filter(
        t => t.username.toLocaleLowerCase().includes(lcQuery)
      );
    },
    getAccountCustomerActive(state){
      return state.accountCustomerActive;
    },
    getAccountEmployeeActive(state){
      console.log("Employee Active Main", state.accountEmployeeActive);
      return state.accountEmployeeActive;
    },
    getListHistoryAccountCustomer(state){
      if(state.listHistoryAccountCustomer.length === 0){
        return state.listHistoryAccountCustomer;
      }
      const lcQuery = state.listHistoryTransferQuery.toLocaleLowerCase();

      return state.listHistoryAccountCustomer.filter((t) => {
        //console.log("Account: ",state.listHistoryAccountCustomer );
        if(t.type === 1 ){
          return t.des_name.toLocaleLowerCase().includes(lcQuery)
        }else{
          return t.source_name.toLocaleLowerCase().includes(lcQuery)
        }
      });
    },

    getListAccountEmployee(state){
      return state.listAccountEmployee;
    },

    getListTotalTransaction(state){
      return state.listTotalTransaction;
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
    SET_LIST_DEBIT(state, payload){
      state.listDebit = [...payload];
    },
    UPDATE_QUERY(state, payload){
      state.accountQuery = payload;
    },
    UPDATE_DEBT_QUERY(state, payload){
      state.debitQuery = payload;
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
    UPDATE_DATA_SENDING_TYPE_PAYMET(state, payload){
      state.data_sending_type_payment = payload
    },
    UPDATE_CODE_VERIFY(state, payload){
      state.code_verify = payload;
    },
    UPDATE_ID_CONTACT_SELECTED(state, payload){
      state.id_contact_selected = payload;
    },
    UPDATE_MODAL_TYPE(state,payload){
      state.modalType = payload;
    },
    INSERT_LIST_CONTACT(state, payload){
      state.listContact = [...state.listContact,payload];
    },
    DELETE_CONTACT(state, payload){
      state.listContact = state.listContact.filter(function( obj ) {
        return obj.id !== payload;
      });
    },
    DELETE_DEBIT_ITEM(state,payload){
      state.listDebit.forEach(function(element){
        if(element.id === payload){
          element.status = -1;
        }
      });
      state.listDebit = [...state.listDebit];
    },
    SET_LIST_HISTORY(state, payload){
      state.listHistory = [...payload];
    },

    // --- 
    SET_LIST_ACCOUNT_CUSTOMER(state, payload){
      state.listAccountCustomer = [...payload];
    },
    // --

    UPDATE_HISTORY_QUERY(state, payload){
      state. historyQuery = payload
    },
    UPDATE_ACCOUNT_NUMBER(state,payload){
      state.account_number = payload;
    },
    UPDATE_BANK_ID(state, payload){
      state.bankID = payload;
    },
    UPDATE_CUSTOMER_NAME(state, payload){
      state.customerName = payload;
    },
    UPDATE_DEBT_MESSAGE(state,payload){
      state.debtMessage = payload;
    },
    UPDATE_MONEY_NUMBER(state,payload){
      state.moneyNumber = payload;
      //state.historyQuery = payload;
    },
    UPDATE_EMAIL_RETRIEVE_PASSWORD(state, payload){
      state.emailRetrievePassword = payload;
    },

    UPDATE_LIST_ACCOUNT_CUSTOMER(state, payload){
      state.accountCustomerQuery = payload;
    },

    UPDATE_ACCOUNT_CUSTOMER_ACTIVE(state, payload){
      state.accountCustomerActive = [...payload];
    },
    
    UPDATE_LIST_HISTORY_TRANSFER(state, payload){
      state.listHistoryTransferQuery = payload;
    },

    GET_HISTORY_ACCOUNT_CUSTOMER(state, payload){
      state.listHistoryAccountCustomer = [...payload];
    },

    UPDATE_HISTORY_ACCOUNT_CUSTOMER(state, payload){
      state.listHistoryAccountCustomer = payload;
    },

    UPDATE_DEBT_ID(state, payload){
      state.debtID = payload;
    },

    SET_LIST_ACCOUNT_EMPLOYEE(state, payload){
      state.listAccountEmployee = [...payload];
    },

    SET_ACCOUNT_EMPLOYEE_ACTIVE(state, payload){
      state.accountEmployeeActive = [...payload];
    },

    SET_TOTAL_TRANSFER_BANK(state, payload){
      state.listTotalTransaction = {...payload};
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
        if(json.success){
          ctx.commit('SET_LIST_CONTACT', json.data);
        }
        else{
          alert(json.error);
        }
      });
    },
    async setListDebit(ctx){
      await myMixin.methods.handleBeforeCallServer();
      const url = 'http://localhost:3000/customer/list_debit';
      return fetch(url, {
        method: 'get', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'x-access-token': localStorage.internetbanking_accesstoken
        },
      }).then(response => response.json())
      .then(json => {
        if(json.success){
          ctx.commit('SET_LIST_DEBIT', json.data);
        }
        else{
          alert(json.error);
        }
      });
    },
    updateQuery(ctx, query){
      ctx.commit('UPDATE_QUERY', query);
    },
    updateDebtQuery(ctx, query){
      ctx.commit('UPDATE_DEBT_QUERY', query);
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
    updateDataSendingTypePayment(ctx, query){
      ctx.commit('UPDATE_DATA_SENDING_TYPE_PAYMET', query);
    },
    updateCodeVerify(ctx, query){
      ctx.commit('UPDATE_CODE_VERIFY', query);
    },
    updateIdContactSelected(ctx, query){
      ctx.commit('UPDATE_ID_CONTACT_SELECTED', query);
    },
    updateModalType(ctx,query){
      ctx.commit('UPDATE_MODAL_TYPE', query);
    },
    updateHistortAccountCustomer(ctx, query){
      ctx.commit('UPDATE_HISTORY_ACCOUNT_CUSTOMER', query);
    },
    insertListContact(ctx,data){
      ctx.commit('INSERT_LIST_CONTACT', data);
    },
    deleteListContact(ctx, id){
      ctx.commit("DELETE_CONTACT", id);
    },
    deleteDebitItem(ctx, id){
      ctx.commit("DELETE_DEBIT_ITEM", id);
    },
    async setListHistory(ctx){
      await myMixin.methods.handleBeforeCallServer();
      const url = 'http://localhost:3000/customer/list_history';
      return fetch(url, {
        method: 'get', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'x-access-token': localStorage.internetbanking_accesstoken
        },
      }).then(response => response.json())
      .then(json => {
        if(json.success){
          ctx.commit("SET_LIST_HISTORY", json.data);
        }
        else{
          alert(json.error)
        }
      });
    },
    updateHistoryQuery(ctx, query){
      ctx.commit('UPDATE_HISTORY_QUERY', query);
    },
    updateBankID(ctx,query){
      ctx.commit('UPDATE_BANK_ID', query);
    },
    updateAccountNumber(ctx,query){
      ctx.commit('UPDATE_ACCOUNT_NUMBER',query);
    },
    updateCustomerName(ctx,query){
      ctx.commit('UPDATE_CUSTOMER_NAME',query);
    },
    updateDebtMessage(ctx,query){
      ctx.commit('UPDATE_DEBT_MESSAGE',query);
    },
    updateMoneyNumber(ctx,query){
      ctx.commit('UPDATE_MONEY_NUMBER',query);
    },
    updateListAccountCustomer(ctx, query){
      ctx.commit('UPDATE_LIST_ACCOUNT_CUSTOMER', query);
    },

    updateListHistoryTransfer(ctx, query){
      ctx.commit('UPDATE_LIST_HISTORY_TRANSFER', query);
    },
    updateAccountCustomerActiveTwo(ctx, query){
      ctx.commit('UPDATE_ACCOUNT_CUSTOMER_ACTIVE', query);
    },

    updateEmailRetrievePassword(ctx, query){
      ctx.commit('UPDATE_EMAIL_RETRIEVE_PASSWORD', query);
    },

    updateDebtID(ctx, query){
      ctx.commit('UPDATE_DEBT_ID',query);
    },

    async updateAccountCustomerActive(ctx, id){
      await myMixin.methods.handleBeforeCallServer();
      const idString = id.toString();
      const  url = 'http://localhost:3000/employee/account_customer/' + idString;
      return fetch(url, {
        method: 'get', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'x-access-token': localStorage.internetbanking_accesstoken
        },
      }).then(response => response.json())
      .then(json => {
        if(json.success){
          console.log(json);
          ctx.commit("UPDATE_ACCOUNT_CUSTOMER_ACTIVE", json.data);
        }
        else{
          alert(json.error)
        }
      });
    },

    async getHistoryAccountCustomer(ctx, id){
      await myMixin.methods.handleBeforeCallServer();
      const idString = id.toString();
      console.log(idString);
      const  url = 'http://localhost:3000/employee/list_history_account_customer/' + idString;
      return fetch(url, {
        method: 'get', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'x-access-token': localStorage.internetbanking_accesstoken
        },
      }).then(response => response.json())
      .then(json => {
        if(json.success){
          console.log(json);
          ctx.commit("GET_HISTORY_ACCOUNT_CUSTOMER", json.data);
        }
        else{
          alert(json.error)
        }
      });
    },

    // SET danh sach tai khoan khach hang 
    async setListAccountCustomer(ctx){
      await myMixin.methods.handleBeforeCallServer();
      const  url = 'http://localhost:3000/employee/list_account_customer';
      return fetch(url, {
        method: 'get', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'x-access-token': localStorage.internetbanking_accesstoken
        },
      }).then(response => response.json())
      .then(json => {
        if(json.success){
          console.log(json);
          ctx.commit("SET_LIST_ACCOUNT_CUSTOMER", json.data);
        }
        else{
          alert(json.error)
        }
      });
    },

    async setListAccountEmployee(ctx){
      await myMixin.methods.handleBeforeCallServer();
      const  url = 'http://localhost:3000/admin/list_account_employee';
      return fetch(url, {
        method: 'get', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'x-access-token': localStorage.internetbanking_accesstoken
        },
      }).then(response => response.json())
      .then(json => {
        if(json.success){
          console.log(json);
          ctx.commit("SET_LIST_ACCOUNT_EMPLOYEE", json.data);
        }
        else{
          alert(json.error)
        }
      });
    },

    async setAccountEmployeeActive(ctx, id){
      await myMixin.methods.handleBeforeCallServer();
      const  url = 'http://localhost:3000/admin/account_employee/' + id;
      return fetch(url, {
        method: 'get', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'x-access-token': localStorage.internetbanking_accesstoken
        },
      }).then(response => response.json())
      .then(json => {
        if(json.success){
          //console.log("Tai khoan nhan vien active", json);
          ctx.commit("SET_ACCOUNT_EMPLOYEE_ACTIVE", json.data);
        }
        else{
          alert(json.error)
        }
      });
    },

    async setTotalTransferBank(ctx, data){
      await myMixin.methods.handleBeforeCallServer();
      const  url = 'http://localhost:3000/admin/total_transfer/' + data.bank + '/' + data.time;
      return fetch(url, {
        method: 'get', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'x-access-token': localStorage.internetbanking_accesstoken
        },
      }).then(response => response.json())
      .then(json => {
        if(json.success){
          console.log(json.data);
          ctx.commit("SET_TOTAL_TRANSFER_BANK", json.data);
        }
        else{
          alert(json.error)
        }
      });
    }

    
  },


  modules: {
  }
})
