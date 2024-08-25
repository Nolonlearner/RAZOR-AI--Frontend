<!-- src/views/ProductDetail.vue -->
<template>
  <div>
    <h1>
      <img :src="product.imgSrc" :alt="product.name" />
      {{ product.name }}
    </h1>
    <p>{{ product.description }}</p>
    <p>之后会在这里加入产品的评价和使用介绍</p>
    <p>
      在此处附上链接
      <a :href="product.link" target="_blank">访问产品链接</a>
    </p>
    <!-- 添加更多产品详细信息 -->
  </div>
</template>

<script>
import { getProductById } from '@/assets/products/aiProducts.js';

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: {},
    };
  },
  created() {
    const productId = this.$route.params.id;
    this.product = getProductById(productId);
    console.log('product', this.product);
  },
};
</script>
