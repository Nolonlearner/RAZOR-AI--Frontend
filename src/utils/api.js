// src/utils/api.js
//api.js 文件用于封装 API 请求，方便在项目中进行统一管理和调用。
import axios from 'axios';
import Storage from './storage'; // 引入 Storage 工具类

const api = axios.create({
  baseURL: '/api',
  timeout: 1000,
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 打印请求的详细信息
    console.log(`Request Method: ${config.method.toUpperCase()}`);
    console.log(`Request URL: ${config.url}`);
    console.log('Request Headers:', config.headers);
    // 自动为 POST 请求设置 Content-Type
    if (config.method === 'post' && !config.headers.get('Content-Type')) {
      config.headers.set('Content-Type', 'application/json');
    }

    // 判断是否需要跳过 Authorization 头
    const testtoken = Storage.get('token');
    console.log('testtoken:', testtoken);
    const skipAuth = config.headers.get('skipAuth');
    if (!skipAuth) {
      console.log('xxxxAdding Authorization header...');
      const dataStr = localStorage.getItem('token');
      const data = JSON.parse(dataStr); // 尝试解析为 JSON
      console.log('data parse json:', data);
      if (data.expiry && Date.now() > data.expiry) {
        localStorage.removeItem('token'); // 清除过期数据
        return null;
      }
      const token = data.value; // 从本地存储中获取 token
      console.log('token here!!!!eee!!!', token);
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        console.warn('Token is missing; Authorization header not set.');
      }
    }
    // 移除自定义标志以免发送到服务器
    config.headers.delete('skipAuth');
    // 打印请求的详细信息
    console.log(`Request Method: ${config.method.toUpperCase()}`);
    console.log(`Request URL: ${config.url}`);
    console.log('Request Headers:', config.headers);
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

export const fetchAllAgentsData = () =>
  api.get('/market', { headers: { skipAuth: true } }); // 跳过 Authorization 头

export const fetchAgentDetail = (agentId) =>
  api.get(`/market/agentdetail/${agentId}`, { headers: { skipAuth: true } }); // 跳过 Authorization 头

export const fetchUserSubscriptions = async (userId) => {
  try {
    const response = await api.get(`/market/user/subs/${userId}`, {
      headers: { skipAuth: false },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user subscriptions:', error);
    throw error;
  }
};
