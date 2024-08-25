<template>
  <el-container>
    <!-- 页头部分 -->
    <el-header>
      <h1>主页</h1>
      <p>
        欢迎来到 RAZOR-AI 主页。这里放logo和名字，以下是一个搜索框和 AI
        产品推送。
      </p>
    </el-header>
    <!-- AI 产品推送部分 -->
    <el-main>
      <div class="search">
        <p>此处是一个搜索框===搜索按钮</p>
        <p>下面放一系列的AI产品推荐</p>
      </div>
      <div class="showProducts"></div>
      <el-row :gutter="30">
        <el-col
          v-for="(product, index) in aiProducts"
          :key="product.id"
          :span="8"
          :offset="index === 0 ? 3 : 0"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="4"
        >
          <div class="ai-product-card">
            <img
              :src="product.imgSrc"
              :alt="product.name"
              class="ai-product-logo"
            />
            <div class="ai-product-name">{{ product.name }}</div>
            <p>{{ product.description }}</p>
            <!-- 查看详情按钮 -->
            <button
              class="secondary-button"
              @click="viewDetails(product.routeName, product.id)"
              size="mini"
            >
              查看详情
            </button>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { aiProducts } from '@/assets/products/aiProducts.js';
export default {
  name: 'Home',
  data() {
    return {
      aiProducts, //引入产品数据
    };
  },
  methods: {
    viewDetails(routeName, id) {
      this.$router.push({ name: routeName, params: { id } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/homeProductsCards.scss';
/* 主页整体布局 */
.el-row {
  margin-bottom: 10px;
}
</style>
