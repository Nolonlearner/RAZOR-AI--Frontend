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
    // 自动为 POST 请求设置 Content-Type
    if (config.method === 'post' && !config.headers.get('Content-Type')) {
      config.headers.set('Content-Type', 'application/json');
    }

    // 判断是否需要跳过 Authorization 头
    if (config.headers.get('skipAuth') !== 'true') {
      const token = Storage.get('token'); // 从本地存储中获取 token
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    // 移除自定义标志以免发送到服务器
    config.headers.delete('skipAuth');
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

// API 请求方法
export const login = (payload) =>
  api.post('/user/login', payload, {
    headers: { skipAuth: true }, // 跳过 Authorization 头
  });

export const register = (payload) =>
  api.post('/user/register', payload, {
    headers: { skipAuth: true }, // 跳过 Authorization 头
  });

export const fetchUserData = () => api.get('/user/data'); // 自动携带 token
