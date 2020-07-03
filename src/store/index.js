import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 
export default new Vuex.Store({
 
  state: {
    // 存储sessionKey
    sessionKey: localStorage.getItem('sessionKey') ? localStorage.getItem('sessionKey') : ''
  },
 actions: {
   changeLogin(ctx,sessionKey){
     ctx.commit('changeLogin',sessionKey);
   }
 },
  mutations: {
    // 修改sessionKey，并将sessionKey存入localStorage
    changeLogin (state,user) {
     state.sessionKey = user.sessionKey;
     console.log("store/index.js---到这里了!"+JSON.stringify(user));
      localStorage.setItem('sessionKey', user.sessionKey);
      localStorage.setItem('userName', user.userName);
    }
  }
});
 
 