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
    console.log('state:', state);
  },
  LOGOUT(state) {
    state.isLoggedIn = false;
    state.user_id = null;
    state.error = null; // 清空错误信息
  },
  SET_ERROR(state, error) {
    state.error = error; // 设置错误信息
  },
};

const actions = {
  // 登录逻辑
  async login({ commit }, { username, password }) {
    const geterrorMsgbyStatus = (status) => {
      switch (status) {
        case 401:
          return '用户名或密码错误';
        case 403:
          return '账户已被禁用';
        case 500:
          return '服务器内部错误';
        case 502:
          return '测试';
        default:
          return '未知错误';
      }
    };

    try {
      const response = await axios.post(
        'http://101.37.88.111:5000/user/login',
        {
          user_name: username, // 用户名
          user_password: password, // 密码
        }
      );

      console.log('Response:', response);
      if (response.status === 200) {
        commit('LOGIN', response.data.user_id); // 成功后设置登录状态
      } else {
        const errorMsg = geterrorMsgbyStatus(response.status);
        commit('SET_ERROR', errorMsg || '登录失败');
      }
    } catch (error) {
      console.log('Error occurred:', error);
      if (error.response) {
        console.log('Response data:', error.response.data);
        const errorMsg = geterrorMsgbyStatus(error.response.status);
        commit('SET_ERROR', errorMsg);
      } else {
        commit('SET_ERROR', '网络错误');
      }
    }
  },

  // 登出逻辑
  async logout({ commit }) {
    try {
      await axios.post('http://101.37.88.111:5000/user/logout');
      commit('LOGOUT');
    } catch (error) {
      const errorMsg = error.response
        ? error.response.data.message || '登出失败'
        : '网络错误';
      commit('SET_ERROR', errorMsg);
    }
  },
};

const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  error: (state) => state.error, // 获取错误信息
  user_id: (state) => state.user_id,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
