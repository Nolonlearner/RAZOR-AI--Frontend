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

      <div class="divider"></div>
      <div class="main-section">
        <div class="main-section-item" @click="navigateTo('Home')">
          <el-icon name="s-home"></el-icon>首页
        </div>
        <div class="main-section-item" @click="navigateTo('SubscribedBots')">
          <el-icon name="s-opportunity"></el-icon>已订阅机器人
        </div>
      </div>
      <div class="divider"></div>
      <div class="chat-history">
        <div
          class="chat-item"
          v-for="chat in chatList"
          :key="chat.id"
          @click="navigateToChat(chat.id)"
        >
          <el-icon name="message"></el-icon>{{ chat.title }}
          <span>{{ chat.robotname }}</span>
        </div>
      </div>
      <div class="divider"></div>
      <div class="menu-item" @click="navigateTo('ProductExpore')">
        <el-icon name="goods"></el-icon>探索机器人
      </div>
      <div class="menu-item" @click="navigateTo('DeveloperCenter')">
        <el-icon name="coordinate"></el-icon>开发者中心
      </div>
      <div class="divider"></div>
      <div class="menu-item" @click="navigateTo('PersonalHome')">
        <el-icon name="s-custom"></el-icon>个人主页
      </div>
      <div class="menu-item" @click="navigateTo('Setting')">
        <el-icon name="setting"></el-icon>系统设置
      </div>
      <div class="menu-item" @click="navigateTo('About')">
        <el-icon name="info"></el-icon>关于我们
      </div>
      <div class="divider"></div>
      <div class="menu-item" @click="navigateTo('Test')">
        <el-icon name="loading"></el-icon>测试页面
      </div>
      <div class="menu-item" @click="navigateTo('Test')">
        <el-icon name="question"></el-icon>帮助中心
      </div>
      <div class="divider"></div>
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
        <h2 class="header-title">{{ headerTitle }}</h2>
        <div class="user-info">
          <el-icon name="user"></el-icon>
          <span v-if="!isLoggedIn" @click="openLoginDialog">用户登录</span>
          <span v-else @click="navigateTo('PersonalHome')"
            >你好，{{ user_id }}</span
          >
        </div>
      </el-header>
      <router-view></router-view>
    </el-main>

    <!-- 登录对话框 -->
    <el-dialog
      :visible.sync="loginDialogVisible"
      title="用户登录"
      :modal="true"
      :close-on-click-modal="false"
    >
      <LoginForm @close="loginDialogVisible = false" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LoginForm from '@/components/LoginForm.vue'; // 引入登录表单组件

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      loginDialogVisible: false,
      isSidebarHidden: false, // 控制菜单栏是否隐藏
      chatList: [
        { id: 1, title: '伦敦的天气', robotname: '机器人1' },
        { id: 2, title: '期末试卷分析', robotname: '机器人2' },
        { id: 3, title: '如何和女朋友聊天', robotname: '机器人3' },
        { id: 4, title: '帮我写一份2亿字的论文', robotname: '机器人4' },
        { id: 5, title: '如何成为美国总统', robotname: '机器人5' },
        { id: 6, title: '意大利面怎么拌混凝土', robotname: '机器人6' },
      ], // 聊天历史列表
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'user_id']),
    headerTitle() {
      // 从当前路由的 meta 信息中获取标题
      return this.$route.meta.title || '默认标题';
    },
  },
  methods: {
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
    // 获取聊天历史列表
    async fetchChatList() {
      try {
        const response = await this.$axios.get('/api/chats');
        this.chatList = response.data; // 假设后端返回 [{ id: 1, title: "聊天 1" }, ...]
      } catch (error) {
        console.error('获取聊天列表失败：', error);
      }
    },
    // 跳转到聊天详情页
    navigateToChat(chatId) {
      this.$router.push({ name: 'ChatDetail', params: { id: chatId } });
    },
  },
  mounted() {
    // this.fetchChatList(); // 页面加载时获取聊天列表
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/styles/layout.scss';
.el-main {
  padding: 0px;
}
.toggle-sidebar-btn {
  cursor: pointer;
  font-size: 1.5rem;
}
</style>
