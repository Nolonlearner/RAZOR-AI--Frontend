<!-- filepath: /d:/MyGitHub/razor-ai-frontend/src/views/HomePage.vue -->
<template>
  <div class="homepage">
    <!-- 背景动画 -->
    <div class="background">
      <div class="glow"></div>
      <div class="grid-lines"></div>
    </div>

    <!-- 顶部 Logo 和标题 -->
    <header class="homepage-header">
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="Logo" />
      </div>
      <h1 class="app-name">RAZOR-AI</h1>
    </header>

    <!-- 搜索框和装饰元素 -->
    <section class="search-section">
      <div class="search-box">
        <input
          type="text"
          class="search-input"
          placeholder="ask me anything..."
          v-model="searchQuery"
        />
        <button @click="performSearch" class="search-button">搜索</button>
      </div>
      <div class="recent-usage">
        <h3>最近使用的AI机器人</h3>
        <ul class="recent-robots-list">
          <li
            v-for="(robot, index) in recentRobots"
            :key="index"
            class="recent-robot-item"
          >
            <img :src="robot.image" :alt="robot.name" />
            <div class="robot-info">
              <h4>{{ robot.name }}</h4>
              <p>{{ robot.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- 分类展示 -->
    <section class="categories">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="category"
      >
        <!-- 分类标题和查看更多按钮 -->
        <div class="category-header">
          <h2>{{ category.title }}</h2>
          <button @click="viewAll(category)">查看更多</button>
        </div>
        <!-- 机器人列表 -->
        <div class="robot-list">
          <!-- 机器人卡片 -->
          <div
            v-for="(robot, idx) in category.robots"
            :key="idx"
            class="robot-card"
          >
            <img :src="robot.image" :alt="robot.name" />
            <h3>{{ robot.name }}</h3>
            <p>{{ robot.description }}</p>
          </div>
        </div>
        <!-- 无限滚动加载 -->
        <infinite-loading
          @infinite="loadMoreRobots(category)"
        ></infinite-loading>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      searchQuery: '',
      recentRobots: [],
      page: 1, // 当前页数
      perPage: 3, // 每页显示的数量
    };
  },
  mounted() {
    this.fetchRecentRobots();
    this.fetchCategories();
  },
  methods: {
    async fetchRecentRobots() {
      try {
        const response = await axios.get('/api/recent-robots');
        this.recentRobots = response.data;
      } catch (error) {
        console.error('Error fetching recent robots:', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('/api/categories');
        this.categories = response.data.map((category) => ({
          ...category,
          robots: [],
          page: 1,
        }));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async loadMoreRobots(category) {
      try {
        const response = await axios.get(
          `/api/categories/${category.id}/robots`,
          {
            params: {
              page: category.page,
              perPage: this.perPage,
            },
          }
        );
        category.robots.push(...response.data);
        category.page += 1;
      } catch (error) {
        console.error('Error loading more robots:', error);
      }
    },
    performSearch() {
      this.$message.success(`搜索内容: ${this.searchQuery}`);
    },
    viewAll(category) {
      this.$message.success(`查看分类: ${category.title}`);
      // 这里可以跳转到对应的分类页面
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

// 背景动画
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: #0d0d0d;

  .glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.3), transparent);
    transform: translate(-50%, -50%);
    animation: pulse 6s infinite;
  }

  .grid-lines {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.1) 1px,
        transparent 1px
      ),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    mix-blend-mode: overlay;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.5;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
}

// 搜索框
.search-section {
  margin-top: 40px;

  .search-box {
    display: flex;
    justify-content: center;
    width: 70%;

    .search-input {
      flex: 1;
      padding: 15px;
      font-size: 16px;
      border-radius: 8px;
      border: 1px solid #444;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }

    .search-button {
      margin-left: 10px;
      padding: 15px 20px;
      background: #00cccc;
      border: none;
      color: #fff;
      border-radius: 8px;
      cursor: pointer;

      &:hover {
        background: #00a3a3;
      }
    }
  }
}

// 分类样式
.categories {
  margin-top: 30px;
  .category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      color: #00cccc;
    }
  }

  .robot-list {
    display: flex;
    gap: 20px;

    .robot-card {
      width: 150px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 10px;
      padding: 15px;
      color: #fff;

      img {
        width: 100%;
        border-radius: 5px;
      }
    }
  }
}
.recent-usage {
  margin-top: 30px;
  h3 {
    color: #00cccc;
  }

  .recent-robots-list {
    display: flex;
    gap: 20px;
    margin-top: 20px;

    .recent-robot-item {
      display: flex;
      align-items: center;
      padding: 10px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 10px;
      color: #fff;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .robot-info {
        h4 {
          margin: 0;
          color: #00cccc;
        }

        p {
          margin: 0;
        }
      }
    }
  }
}
</style>
