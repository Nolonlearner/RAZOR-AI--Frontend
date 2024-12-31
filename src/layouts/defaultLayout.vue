<!-- src/layouts/defaultLayout.vue -->
<template>
  <div class="layout-container">
    <!-- 左侧菜单栏 -->
    <aside class="sidebar" :class="{ hidden: isSidebarHidden }">
      <div class="logo-button-container">
        <img class="logo" src="@/assets/images/logo.png" alt="Logo" />
        <div class="company-name">RAZOR-AI</div>
        <!-- 菜单栏收缩按钮 -->
        <button
          class="toggle-sidebar-btn"
          v-if="!isSidebarHidden"
          @click="toggleSidebar"
        >
          <el-icon name="s-fold"></el-icon>
        </button>
      </div>

      <!-- 主要功能区域 -->
      <div class="main-section">
        <div class="main-section-item" @click="navigateTo('Home')">
          <el-icon name="s-home"></el-icon>首页
        </div>
        <div class="main-section-item" @click="navigateTo('SubscribedBots')">
          <el-icon name="s-opportunity"></el-icon>已订阅机器人
        </div>
      </div>
      <div class="chat-history">
        <div
          class="chat-item"
          v-for="chat in chatlists"
          :key="chat.id"
          @click="navigateToChat(chat.id)"
        >
          <el-icon name="chat-dot-square" class="chat-icon"></el-icon
          >{{ chat.name }}
          <span>{{ chat.agent_name }}</span>
        </div>
      </div>
      <div class="menu-item" @click="navigateTo('ProductExpore')">
        <el-icon name="goods" class="menu-item-icon"></el-icon>探索机器人
      </div>
      <div class="menu-item" @click="navigateTo('DeveloperCenter')">
        <el-icon name="coordinate" class="menu-item-icon"></el-icon>开发者中心
      </div>
      <div class="menu-item" @click="navigateTo('PersonalHome')">
        <el-icon name="s-custom" class="menu-item-icon"></el-icon>个人主页
      </div>
      <div class="menu-item" @click="navigateTo('Test')">
        <el-icon name="chat-line-round" class="menu-item-icon"></el-icon
        >睿择社区
      </div>
      <div class="menu-item" @click="navigateTo('Setting')">
        <el-icon name="setting" class="menu-item-icon"></el-icon>系统设置
      </div>
      <div class="menu-item" @click="navigateTo('About')">
        <el-icon name="info" class="menu-item-icon"></el-icon>关于我们
      </div>
      <!-- <div class="divider"></div> -->
      <div class="menu-item" @click="navigateTo('Test')">
        <el-icon name="loading" class="menu-item-icon"></el-icon>测试页面
      </div>
      <div class="menu-item" @click="navigateTo('Test')">
        <el-icon name="question" class="menu-item-icon"></el-icon>帮助中心
      </div>
    </aside>

    <!-- 右侧内容区域 -->
    <el-main>
      <!-- 页头部分 -->
      <el-header class="ourHeader">
        <!-- 在侧边栏隐藏时，显示控制按钮 -->
        <button
          v-if="isSidebarHidden"
          class="toggle-sidebar-btn in-header"
          @click="toggleSidebar"
        >
          <el-icon name="s-unfold"></el-icon>
        </button>
        <h2 class="header-name">{{ headername }}</h2>
        <div class="user-info">
          <el-icon name="user"></el-icon>
          <span v-if="!isLoggedIn" @click="openLoginDialog">用户登录</span>
          <span v-else @click="navigateTo('PersonalHome')"
            >你好，{{ userName }}</span
          >
        </div>
      </el-header>
      <router-view></router-view>
    </el-main>

    <!-- 登录对话框 -->
    <el-dialog
      :visible.sync="loginDialogVisible"
      name="用户登录"
      :modal="true"
      :close-on-click-modal="false"
      center
      width="30%"
    >
      <LoginForm @close="loginDialogVisible = false" />
    </el-dialog>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'; // 引入登录表单组件
import { mapGetters, mapState, mapActions } from 'vuex'; // 引入 mapGetters, mapActions
import user from '@/store/user';
export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      loginDialogVisible: false,
      isSidebarHidden: false, // 控制菜单栏是否隐藏
    };
  },
  created() {
    this.getAllChats();
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn', 'userId', 'userName']), // 映射 getters
    ...mapState('chat', {
      chatlists: (state) => state.chats,
    }),
    ...mapState('user', ['isLoggedIn', 'userName', 'userId', 'token']), // 绑定 Vuex 状态，当信息改变时，自动更新
    headername() {
      // 从当前路由的 meta 信息中获取标题
      console.log('当前路由：', this.$route);
      return this.$route.meta.title || '默认标题';
    },
  },
  methods: {
    ...mapActions('chat', ['fetchChats']), // 映射 actions, 用于获取聊天列表
    async getAllChats() {
      try {
        const response = await this.fetchChats({
          user_id: user.state.userId,
        });
        console.log('获取聊天列表成功：', response);
      } catch (error) {
        console.error('获取聊天列表失败：', error);
      }
    },
    toggleSidebar() {
      this.isSidebarHidden = !this.isSidebarHidden;
    },
    navigateTo(route) {
      if (this.$route.name !== route) {
        this.$router.push({ name: route });
      }
    },
    openLoginDialog() {
      this.loginDialogVisible = true;
    },
    // 跳转到聊天详情页
    navigateToChat(chatId) {
      this.$router.push({ name: 'ChatDetail', params: { id: chatId } });
    },
  },
  watch: {
    userId(newVal) {
      console.log('userId changed:', newVal);
    },
    isLoggedIn(newVal) {
      console.log('isLoggedIn changed:', newVal);
    },
  },
};
</script>
<style lang="scss" scoped>
@use '@/assets/styles/layout.scss' as *;
.el-main {
  padding: 0px;
}

.toggle-sidebar-btn {
  cursor: pointer;
  font-size: 1.5rem;
}
</style>
