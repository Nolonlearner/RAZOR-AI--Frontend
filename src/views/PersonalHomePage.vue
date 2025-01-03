<!--personalHomePage.vue-->
<template>
  <div class="profile-page">
    <h1 class="title">个人主页</h1>
    <p class="description">
      欢迎来到您的个人主页，您可以在此修改个人信息和查看好友。
    </p>

    <div class="profile-container">
      <div class="profile-header">
        <div class="avatar-section">
          <img :src="avatar" alt="用户头像" class="avatar" />
          <el-button @click="editAvatar" size="mini">修改头像</el-button>
        </div>
        <div class="user-info">
          <h2>{{ username }}</h2>
          <p>邮箱：{{ email }}</p>
          <p>个人简介：{{ bio }}</p>
        </div>
      </div>

      <div class="info-container">
        <!-- 感兴趣的模块 -->
        <div class="info-group">
          <h3>感兴趣的模块</h3>
          <ul class="interest-list">
            <li v-for="module in interestModules" :key="module">
              {{ module }}
            </li>
          </ul>
          <el-button @click="editInterest" size="mini">编辑兴趣模块</el-button>
        </div>

        <!-- 我的好友 -->
        <div class="info-group">
          <h3>我的好友</h3>
          <ul class="friend-list">
            <li v-for="friend in friends" :key="friend">{{ friend }}</li>
          </ul>
          <el-button @click="addFriend" size="mini">添加好友</el-button>
        </div>

        <!-- 我喜欢的机器人 -->
        <div class="info-group">
          <h3>我喜欢的机器人</h3>
          <ul class="robot-list">
            <li v-for="robot in favoriteRobots" :key="robot">{{ robot }}</li>
          </ul>
        </div>

        <!-- 我常用的编辑工具 -->
        <div class="info-group">
          <h3>我常用的编辑工具</h3>
          <ul class="tool-list">
            <li v-for="tool in favoriteTools" :key="tool">{{ tool }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="button-group">
      <el-button type="primary" @click="saveProfile">保存个人信息</el-button>
      <el-button @click="confirmLogout" size="mini" type="danger"
        >登出</el-button
      >
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui';
import { mapActions } from 'vuex';
import user from '@/store/user';
export default {
  name: 'UserProfile',
  data() {
    return {
      avatar: 'https://via.placeholder.com/150',
      username: '',
      email: '666@example.com',
      bio: '喜欢编程和旅游。',
      interestModules: ['编程', '旅游', '健身'],
      friends: ['何雯宏', '许昕格', '王加添'],
      favoriteRobots: ['R2-D2', 'C-3PO', 'Optimus Prime'],
      favoriteTools: ['VS Code', 'Sublime Text', 'WebStorm'],
    };
  },
  created() {
    this.username = user.state.userName;
    console.log('user:', user);
  },
  methods: {
    editAvatar() {
      this.$message.info('修改头像功能待实现');
    },
    editInterest() {
      this.$message.info('编辑兴趣模块功能待实现');
    },
    addFriend() {
      this.$message.info('添加好友功能待实现');
    },
    saveProfile() {
      console.log('个人信息保存:', {
        username: this.username,
        email: this.email,
        bio: this.bio,
        interestModules: this.interestModules,
        friends: this.friends,
        favoriteRobots: this.favoriteRobots,
        favoriteTools: this.favoriteTools,
      });
      this.$message.success('个人信息已保存！');
    },
    confirmLogout() {
      // 弹出确认对话框
      MessageBox.confirm('您确定要登出吗？', '确认登出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // 用户点击“确定”后执行登出操作
          this.outSubmit();
        })
        .catch(() => {
          // 用户点击“取消”时不做任何操作
          console.log('取消登出');
        });
    },
    ...mapActions('user', ['logout']), // 映射 user 模块中的 logout 方法
    async outSubmit() {
      this.isLoading = true; // 显示加载状态
      try {
        // 调用 Vuex 中的 logout 动作
        const result = await this.logout();
        console.log(result);
        // 清除本地存储的用户信息（如 token）
        this.$message.success('登出成功！'); // 提示登出成功
        // 跳转到登录页面
        if (this.$route.name !== 'Home') {
          this.$router.push({ name: 'Home' });
          location.reload(); // 强制刷新页面
        }
      } catch (error) {
        console.error(error); // 打印错误信息
        this.$message.error(error.message || '登出失败');
      } finally {
        // 无论成功或失败都会执行
        this.isLoading = false; // 结束加载状态
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@use '@/assets/styles/mixins.scss' as *;
@use '@/assets/styles/variables.scss' as *;
.html-body {
  height: 100%; /* 设置 html 和 body 高度为 100% */
  margin: 0; /* 去除默认边距 */
  padding: 0; /* 去除默认内边距 */
  overflow: hidden;
}

.profile-page {
  height: auto; /* 使用视口高度 */
  max-width: 100%;
  padding: 20px;
  background-color: $background-color; /* 深色背景 */
  color: $text-color; /* 白色文字 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.title {
  font-size: 2em;
  text-align: center;
  margin-bottom: 10px;
}

.description {
  text-align: center;
  margin-bottom: 20px;
  color: #aaa; /* 灰色文字 */
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.avatar-section {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.user-info h2 {
  font-size: 1.5em;
  font-weight: bold;
}

.user-info p {
  font-size: 1.1em;
  color: #aaa;
  margin-top: 5px;
}

.info-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
}

.info-group {
  width: 45%; /* 每个信息组的宽度 */
  margin: 0 10px;
  padding: 15px;
  background-color: #3a3a3a;
  border-radius: 5px;
  margin-bottom: 20px;
}

.info-group h3 {
  font-size: 1.3em;
  color: #ffffff;
  margin-bottom: 10px;
}

.interest-list,
.friend-list,
.robot-list,
.tool-list {
  list-style-type: none;
  padding: 0;
}

.interest-list li,
.friend-list li,
.robot-list li,
.tool-list li {
  color: #aaa;
  font-size: 1.1em;
  margin-bottom: 5px;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
