import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  getters:{
    getToken(state){
      return state.token;
    }
  },
  mutations: {
    CREATE_TOKEN(state, payload){
      console.log(payload);
      state.token = payload;
    }
  },
  actions: {
    createToken(ctx, token){
      ctx.commit('CREATE_TOKEN', token);
    }
  },
  modules: {
  }
})
