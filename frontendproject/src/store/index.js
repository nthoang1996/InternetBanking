import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  },
  mutations: {
    INIT_USER(state, payload) {
      console.log(payload);
      state.user = payload;
    }
  },
  actions: {
    initSidebar(ctx) {
      const url = 'http://localhost:3000/general/get_user_login_info'
      fetch(url, {
        method: 'get', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'x-access-token': localStorage.internetbanking_accesstoken
        },
      }).then(response => response.json())
      .then(json => {
        console.log(json);
        ctx.commit('INIT_USER', json.user);
      });      
    }
  },
  modules: {
  }
})
