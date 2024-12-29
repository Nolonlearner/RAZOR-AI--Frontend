// src/utils/api.js
//api.js 文件用于封装 API 请求，方便在项目中进行统一管理和调用。
// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 1000,
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = Storage.get('token'); // 从本地存储中获取 token

    // 判断是否需要跳过 Authorization 头
    if (!config.skipAuth && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error); // 请求错误直接返回
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => response, // 正常响应直接返回
  (error) => {
    // 处理错误响应
    if (error.response) {
      console.log('Error response in api.js:', error.response);
      const { status, data } = error.response;
      return Promise.reject({ code: status, message: data.message }); // 返回错误状态码和消息
    } else {
      return Promise.reject({ code: 500, message: '网络错误，请稍后再试' }); // 返回网络错误
    }
  }
);

// API 请求函数
export const login = (payload) =>
  api.post('/user/login', payload, { skipAuth: true }); // 登录接口不需要携带 token
export const register = (payload) =>
  api.post('/user/register', payload, { skipAuth: true }); // 注册接口不需要携带 token
export const fetchUserData = () =>
  api.get('/user/data'); // 需要携带 token 的接口
