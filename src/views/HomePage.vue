<template>
  <div class="home-page">
    <!-- 页头部分 -->
    <el-row class="header" justify="center">
      <el-col :span="20">
        <h1>主页</h1>
        <p>欢迎来到 RAZOR-AI 主页。以下是一个搜索框和 AI 产品推送。</p>
      </el-col>
    </el-row>

    <!-- 搜索框 -->
    <el-row class="search-section" justify="center">
      <el-col :span="16">
        <el-input
          v-model="searchQuery"
          placeholder="搜索 AI 产品、服务或其他内容"
          prefix-icon="el-icon-search"
          clearable
        />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">
          搜索
        </el-button>
      </el-col>
    </el-row>

    <!-- AI 产品推送部分 -->
    <el-row class="products-section" gutter="20" justify="center">
      <el-col :span="20">
        <h2>推荐产品</h2>
        <el-row gutter="20">
          <el-col :span="8" v-for="(product, index) in products" :key="index">
            <el-card shadow="hover" class="product-item">
              <img :src="product.image" alt="" class="product-image" />
              <h3>{{ product.name }}</h3>
              <p>{{ product.description }}</p>
              <el-button type="text">查看详情</el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      searchQuery: '',
      products: [
        {
          name: '产品 1',
          description: '这是产品 1 的描述信息。',
          image: 'https://via.placeholder.com/300',
        },
        {
          name: '产品 2',
          description: '这是产品 2 的描述信息。',
          image: 'https://via.placeholder.com/300',
        },
        {
          name: '产品 3',
          description: '这是产品 3 的描述信息。',
          image: 'https://via.placeholder.com/300',
        },
      ],
    };
  },
  methods: {
    handleSearch() {
      this.$message({
        message: `搜索关键词: ${this.searchQuery}`,
        type: 'success',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/* 主页整体布局 */
.home-page {
  padding: 2rem;
  background-color: #f9f9f9;
}

/* 页头部分样式 */
.header {
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    color: #333;
  }

  p {
    font-size: 1.2rem;
    color: #666;
  }
}

/* 搜索框样式 */
.search-section {
  margin-bottom: 2rem;

  .el-input {
    width: 100%;
  }

  .el-button {
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
}

/* AI 产品推送部分样式 */
.products-section {
  margin-top: 2rem;

  h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .product-item {
    text-align: center;

    .product-image {
      width: 100%;
      height: auto;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1rem;
      color: #666;
      margin-bottom: 1rem;
    }

    .el-button {
      color: #2e073f;
    }
  }
}
</style>
