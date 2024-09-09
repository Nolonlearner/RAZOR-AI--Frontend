<!-- src/views/PersonalHomePage.vue -->
<template>
  <div class="personal-home">
    <div class="header">
      <img :src="userAvatar" alt="用户头像" class="avatar" />
      <h1 class="title">个人主页</h1>
      <p class="intro">欢迎回来，{{ userName }}！</p>
    </div>

    <div class="info-section">
      <h2>个人信息</h2>
      <div class="info-item">
        <span class="label">用户名:</span>
        <span class="value">{{ userName }}</span>
      </div>
      <div class="info-item">
        <span class="label">邮箱:</span>
        <span class="value">{{ userEmail }}</span>
      </div>
      <div class="info-item">
        <span class="label">当前等级:</span>
        <span class="value">{{ userLevel }}</span>
        <el-button size="mini" @click="navigateToEditInfo">编辑</el-button>
      </div>
    </div>

    <div class="preferences-section">
      <h2>用户喜好</h2>
      <ul>
        <li
          v-for="(preference, index) in userPreferences"
          :key="index"
          class="preference-item"
        >
          {{ preference }}
        </li>
      </ul>
      <el-button size="mini" @click="navigateToEditPreferences"
        >编辑喜好</el-button
      >
    </div>

    <div class="bio-section">
      <h2>个人介绍</h2>
      <p class="bio">{{ userBio }}</p>
      <el-button size="mini" @click="navigateToEditBio">编辑个人介绍</el-button>
    </div>

    <div class="products-section">
      <h2>最近常用的 AI 产品</h2>
      <ul>
        <li
          v-for="product in aiProducts"
          :key="product.id"
          class="product-item"
        >
          <strong>{{ product.name }}</strong
          >: {{ product.description }}
        </li>
      </ul>
    </div>

    <div class="followed-users-section">
      <h2>关注的用户</h2>
      <ul>
        <li
          v-for="user in followedUsers"
          :key="user.id"
          class="followed-user-item"
        >
          {{ user.name }}
        </li>
      </ul>
    </div>

    <div class="button-group">
      <el-button type="primary" @click="navigateToChangePassword"
        >修改密码</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalHome',
  data() {
    return {
      userAvatar: 'https://via.placeholder.com/100', // 替换为用户头像URL
      userName: '用户名称', // 从 Vuex 或 API 获取
      userEmail: 'user@example.com', // 从 Vuex 或 API 获取
      userLevel: '初级', // 从 Vuex 或 API 获取
      userPreferences: ['喜好A', '喜好B', '喜好C'], // 从 API 获取用户喜好
      userBio: '这是用户的个人介绍。', // 从 Vuex 或 API 获取
      aiProducts: [
        { id: 1, name: 'AI 产品 A', description: '这是AI产品A的描述。' },
        { id: 2, name: 'AI 产品 B', description: '这是AI产品B的描述。' },
      ], // 从 API 获取用户使用的 AI 产品
      followedUsers: [
        { id: 1, name: '关注用户A' },
        { id: 2, name: '关注用户B' },
      ], // 从 API 获取关注的用户
    };
  },
  methods: {
    navigateToChangePassword() {
      this.$router.push({ name: 'ChangePassword' });
    },
    navigateToEditInfo() {
      this.$router.push({ name: 'EditInfo' });
    },
    navigateToEditPreferences() {
      this.$router.push({ name: 'EditPreferences' });
    },
    navigateToEditBio() {
      this.$router.push({ name: 'EditBio' });
    },
  },
};
</script>

<style scoped>
.personal-home {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-width: 100%;
  height: 100vh; /* 占满整个主区域 */
  padding: 20px;
  background-color: #f9f9f9; /* 背景颜色 */
  overflow-y: auto; /* 允许纵向滚动 */
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%; /* 圆形头像 */
  margin-bottom: 10px;
}

.title {
  font-size: 2em;
  color: #333;
}

.intro {
  color: #777;
}

.info-section,
.preferences-section,
.bio-section,
.products-section,
.followed-users-section {
  width: 100%;
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ddd; /* 边框 */
  border-radius: 8px; /* 圆角 */
  background-color: #fff; /* 背景颜色 */
}

.info-item,
.preference-item,
.followed-user-item,
.product-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee; /* 分隔线 */
}

.info-item:last-child,
.preference-item:last-child,
.followed-user-item:last-child,
.product-item:last-child {
  border-bottom: none; /* 最后一项不显示分隔线 */
}

.label {
  font-weight: bold;
}

.bio {
  padding: 10px 0;
}

.button-group {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}
</style>
