<template>
  <div class="product-list">
    <h1 class="page-title">探索AI机器人</h1>
    <div class="products-container">
      <div v-for="product in aiProducts" :key="product.id" class="product-card">
        <img :src="product.imgSrc" :alt="product.name" class="product-image" />
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <a :href="product.link" target="_blank" class="link">访问产品</a>
      </div>
    </div>
  </div>
</template>

<script>
import { aiProducts } from '@/assets/products/aiProducts.js';

export default {
  name: 'ProductList',
  data() {
    return {
      aiProducts,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins.scss' as *;
@use '@/assets/styles/variables.scss' as *;
@use 'sass:color'; // 引入颜色函数
.product-list {
  padding: 20px;
  background-color: $background-color; /* 深色背景 */
  color: $text-color; /* 白色文字 */
  height: 100%;
}

.page-title {
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 30px;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.product-card {
  background-color: color.adjust(
    $background-color,
    $lightness: 5%
  ); /* 卡片背景 */
  border-radius: 10px; /* 圆角 */
  margin: 15px;
  padding: 15px;
  width: 240px; /* 缩小卡片宽度 */
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* 阴影效果 */
  transition:
    transform 0.3s,
    box-shadow 0.3s; /* 动画效果 */
}

.product-card:hover {
  transform: scale(1.05); /* 悬停时放大 */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5); /* 增加阴影 */
}

.product-image {
  width: 80px; /* 图片宽度 */
  height: auto;
  margin-bottom: 10px; /* 图片与标题间距 */
}

.product-name {
  font-size: 1.5em;
  margin: 10px 0;
}

.product-description {
  font-size: 0.9em;
  margin-bottom: 10px;
}
</style>
