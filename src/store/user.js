// src/store/user.js
import axios from 'axios';

const state = {
  isLoggedIn: false, // 是否登录
  user_id: null, // 登录用户的用户名
  error: null, // 登录错误信息
};

const mutations = {
  LOGIN(state, user_id) {
    state.isLoggedIn = true;
    state.user_id = user_id;
    state.error = null; // 清空错误信息
  },
  LOGOUT(state) {
    state.isLoggedIn = false;
    state.userid = null;
    state.error = null; // 清空错误信息
  },
  SET_ERROR(state, error) {
    state.error = error; // 设置错误信息
  },
};

const actions = {
  // 登录逻辑
  async login({ commit }, { username, password }) {
    try {
      const response = await axios.post(
        'http://101.37.88.111:5000/user/login',
        {
          user_name: username, //用户名user_name
          user_password: password, //密码user_password
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log('success');

        commit('LOGIN', response.data.user_id); // 成功后设置登录状态
      } else {
        console.log('error');
        const errorMsg = response.data.message || '登录失败';
        commit('SET_ERROR', errorMsg);
      }
    } catch (error) {
      const networkError = error.message || '网络错误';
      commit('SET_ERROR', networkError);
    }
  },

  // 登出逻辑
  async logout({ commit }) {
    try {
      await axios.post('http://101.37.88.111:5000/user/logout'); // 假设有一个登出的 API,目前还没有开发
      commit('LOGOUT');
    } catch (error) {
      const networkError = error.message || '登出失败';
      commit('SET_ERROR', networkError);
    }
  },
};

const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  user: (state) => state.user,
  error: (state) => state.error, // 获取错误信息
};

export default {
  state,
  mutations,
  actions,
  getters,
};
