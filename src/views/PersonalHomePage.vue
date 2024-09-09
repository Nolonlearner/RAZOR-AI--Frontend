<template>
  <div class="personal-home">
    <h1 class="title">个人主页</h1>
    <p class="intro">欢迎回来，{{ userName }}！</p>

    <div class="profile-container">
      <div class="profile-left">
        <div class="avatar-container">
          <img :src="userAvatar" alt="用户头像" class="avatar" />
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
        <div class="bio-section">
          <h2>个人介绍</h2>
          <p class="bio">{{ userBio }}</p>
          <el-button size="mini" @click="navigateToEditBio"
            >编辑个人介绍</el-button
          >
        </div>
      </div>

      <div class="profile-right">
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
          <el-button size="mini" @click="editPreferences">编辑喜好</el-button>
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

        <div class="community-section">
          <h2>参加AI社区</h2>
          <el-button size="mini" @click="joinCommunity">加入社区</el-button>
        </div>

        <div class="change-password-section">
          <h2>修改密码</h2>
          <el-button type="primary" @click="navigateToChangePassword"
            >修改密码</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalHome',
  data() {
    return {
      userAvatar: 'https://via.placeholder.com/100',
      userName: '用户名称',
      userEmail: 'user@example.com',
      userLevel: '初级',
      userPreferences: ['喜好A', '喜好B', '喜好C'],
      userBio: '这是用户的个人介绍。',
      aiProducts: [
        { id: 1, name: 'AI 产品 A', description: '这是AI产品A的描述。' },
        { id: 2, name: 'AI 产品 B', description: '这是AI产品B的描述。' },
      ],
      followedUsers: [
        { id: 1, name: '关注用户A' },
        { id: 2, name: '关注用户B' },
      ],
    };
  },
  methods: {
    navigateToChangePassword() {
      this.$router.push({ name: 'ChangePassword' });
    },
    navigateToEditInfo() {
      this.$message.info('编辑个人信息功能待实现');
    },
    editPreferences() {
      this.$message.info('编辑喜好功能待实现');
    },
    navigateToEditBio() {
      this.$message.info('编辑个人介绍功能待实现');
    },
    joinCommunity() {
      this.$message.info('加入AI社区功能待实现');
    },
  },
};
</script>

<style scoped>
.personal-home {
  max-width: 1200px; /* 增加画布宽度 */
  height: auto; /* 自适应高度 */
  padding: 20px;
  background-color: #1e1e1e;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  margin: auto; /* 居中 */
  animation: fadeIn 0.5s ease;
}

.title {
  font-size: 2em;
  text-align: center;
}

.intro {
  text-align: center;
  color: #aaa;
}

.profile-container {
  display: flex;
  justify-content: space-between;
  flex: 1;
}

.profile-left,
.profile-right {
  width: 48%;
  padding: 15px;
  background-color: #2a2a2a;
  border-radius: 8px;
  margin: 10px; /* 间隔 */
  transition: transform 0.3s; /* 添加过渡效果 */
}

.profile-left:hover,
.profile-right:hover {
  transform: scale(1.02); /* 鼠标悬停时放大 */
}

.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.info-section,
.bio-section,
.preferences-section,
.products-section,
.followed-users-section,
.community-section,
.change-password-section {
  margin-bottom: 15px; /* 板块间隔 */
  opacity: 0; /* 初始透明度 */
  animation: fadeIn 0.5s ease forwards; /* 动画效果 */
}

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

.info-item,
.preference-item,
.followed-user-item,
.product-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #444;
}

.info-item:last-child,
.preference-item:last-child,
.followed-user-item:last-child,
.product-item:last-child {
  border-bottom: none;
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
  margin-top: 20px;
}
</style>
