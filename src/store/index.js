// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 定义状态
  },
  mutations: {
    // 定义变更状态的方法
  },
  actions: {
    // 定义异步操作
  },
  modules: {
    // 组织模块
    user, // 注册 user 模块
  },
});
