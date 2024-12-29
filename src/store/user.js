// src/store/user.js
import { login as apiLogin } from '../utils/api'; // 引入 API 请求
import { register as apiRegister } from '../utils/api'; // 引入 API 请求
import Storage from '../utils/storage'; // 引入 Storage 工具类
const state = {
  token: Storage.get('token'),
  userId: Storage.get('user_id'),
  userName: Storage.get('userName'),
  isLoggedIn: !!Storage.get('token'),
};

const mutations = {
  SET_USER_INFO(state, { token, userId, username }) {
    state.token = token;
    state.userId = userId;
    state.userName = username;
    state.isLoggedIn = !!token;

    // 设置过期时间为 1 天（单位：毫秒）
    const TTL = 1 * 24 * 60 * 60 * 1000;
    Storage.set('token', token, TTL);
    Storage.set('user_id', userId, TTL);
    Storage.set('userName', username, TTL);
  },
  LOGOUT(state) {
    state.token = null;
    state.userId = null;
    state.userName = null;
    state.isLoggedIn = false;

    Storage.remove('token');
    Storage.remove('user_id');
    Storage.remove('userName');
  },
};

const actions = {
  // 登录逻辑
  async login({ commit }, payload) {
    try {
      const response = await apiLogin(payload); // 调用登录接口 response是来自api.js的login函数的返回值
      const { token, message, username } = response.data; // 从响应中解构出 token 和 user_id 和userName
      commit('SET_USER_INFO', { token, userId: payload.user_id, username }); // 保存 token 和 userId 和userName 到 store
      return { success: true, message }; // 返回成功信息给LoginForm组件
    } catch (error) {
      console.log('Error occurred in user.js:', error);
      return { success: false, message: error.message };
    }
  },

  async logout({ commit }) {
    commit('LOGOUT');
    return { success: true, message: '成功退出登录' }; // 返回成功信息给Logout组件
  },

  async register(payload) {
    try {
      const response = await apiRegister(payload);
      const { user_id, message } = response.data;
      return { success: true, message, user_id }; // 返回成功信息给RegisterPage
    } catch (error) {
      console.log('Error occurred in user.js:', error);
      return { success: false, message: error.message };
    }
  },
};

const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  user_id: (state) => state.user_id,
  userName: (state) => state.userName,
};

export default {
  namespaced: true, // 启动命名空间
  state,
  mutations,
  actions,
  getters,
};
