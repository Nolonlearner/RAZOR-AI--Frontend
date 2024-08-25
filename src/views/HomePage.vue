<template>
  <el-container>
    <!-- 页头部分 -->
    <el-header>
      <h1>主页</h1>
    </el-header>
    <!-- AI 产品推送部分 -->
    <el-main>
      <div class="search">
        <!-- 搜索框和搜索按钮 -->
        <el-input
          v-model="searchQuery"
          placeholder="搜索AI产品"
          class="search-input"
          clearable
        />
        <el-button type="primary" @click="searchProduct"
          ><el-icon name="search"></el-icon>搜索</el-button
        >
      </div>
      <div class="showProducts">
        <el-row :gutter="20">
          <el-col
            v-for="(product, index) in filteredProducts"
            :key="product.id"
            :span="6"
            :offset="index === 0 ? 3 : 0"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
          >
            <div class="ai-product-card">
              <div class="ai-product-header">
                <img
                  :src="product.imgSrc"
                  :alt="product.name"
                  class="ai-product-logo"
                />
                <div class="ai-product-name">{{ product.name }}</div>
              </div>
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
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { aiProducts } from '@/assets/products/aiProducts.js';
export default {
  name: 'Home',
  data() {
    return {
      aiProducts, // 引入产品数据
      searchQuery: '', // 搜索框的绑定值
    };
  },
  computed: {
    // 过滤后的产品列表
    filteredProducts() {
      return this.aiProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    searchProduct() {
      // 这里可以添加搜索逻辑，如果需要的话
      this.$message.info(`搜索关键词: ${this.searchQuery}`);
    },
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
.search {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  .search-input {
    margin-right: 10px;
    max-width: 600px; // 限制搜索框的最大宽度
  }
}
.el-row {
  margin-bottom: 10px;
}
</style>
