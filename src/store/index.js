// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import agent from './agent';
import chat from './chat';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // 组织模块
    user, // 注册 user 模块
    agent, // 注册 agent 模块
    chat, // 注册 chat 模块
  },
  // actions: {
  //   logout({ commit }) {
  //     commit('user/SET_LOGOUT');
  //     commit('agent/RESET');
  //     commit('chat/RESET');
  //   }
  // }
});
