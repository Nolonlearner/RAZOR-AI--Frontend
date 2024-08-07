// src/utils/api.js
//api.js 文件用于封装 API 请求，方便在项目中进行统一管理和调用。
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 1000,
});

export const getProduct = (id) => api.get(`/products/${id}`);
export const getAllProducts = () => api.get('/products');

// 使用方法
// src/views/Product.vue
/*
import { getProduct } from '@/utils/api.js';

export default {
  data() {
    return {
      product: null,
    };
  },
  async created() {
    this.product = await getProduct(this.$route.params.id);
  },
};
*/
