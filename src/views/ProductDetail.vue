<!--src/views/ProductDetail.vue-->
<template>
  <div class="product-detail">
    <h1 class="product-title">
      <img :src="product.imgSrc" :alt="product.name" class="product-image" />
      {{ product.name }}
    </h1>
    <p class="product-description">{{ product.description }}</p>
    <p class="coming-soon">之后会在这里加入产品的评价和使用介绍</p>
    <p class="product-link">
      在此处附上链接
      <a :href="product.link" target="_blank" class="link">访问产品链接</a>
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

<style scoped>
.product-detail {
  max-width: 800px; /* 最大宽度 */
  margin: auto; /* 居中 */
  padding: 20px;
  background-color: #1e1e1e; /* 深色背景 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  color: #ffffff; /* 白色文字 */
  animation: fadeIn 0.5s ease; /* 动画效果 */
}

.product-title {
  font-size: 2em;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.product-image {
  width: 100px; /* 图片宽度 */
  height: auto; /* 自适应高度 */
  margin-right: 15px; /* 图片与标题间距 */
  border-radius: 5px; /* 圆角 */
}

.product-description {
  margin-bottom: 20px;
}

.coming-soon {
  color: #aaa; /* 灰色文字 */
  margin-bottom: 20px;
}

.product-link {
  margin-top: 20px;
}

.link {
  color: #1e90ff; /* 链接颜色 */
  text-decoration: none; /* 去掉下划线 */
}

.link:hover {
  text-decoration: underline; /* 悬停时下划线 */
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px); /* 初始向下位移 */
  }
  to {
    opacity: 1;
    transform: translateY(0); /* 回到原位 */
  }
}
</style>
