<!-- src/layouts/defaultLayout.vue -->
<template>
  <div class="layout-container">
    <!-- 左侧菜单栏 -->
    <aside class="sidebar">
      <div class="logo-container">
        <img class="logo" src="@/assets/images/logo.png" alt="Logo" />
        <div class="company-name">RAZOR-AI</div>
        <!-- 控制按钮：控制菜单栏是否隐藏-->
        <button class="toggle-sidebar-btn" @click="toggleSidebar">
          <el-icon :name="isSidebarHidden ? 'menu' : 'close'"></el-icon>
        </button>
      </div>
      <div class="divider"></div>
      <div class="menu-item" @click="navigateTo('Home')">
        <el-icon name="s-home"></el-icon>首页
      </div>
      <div class="divider"></div>
      <div class="menu-item" @click="navigateTo('Chat')">
        <el-icon name="message"></el-icon>我的机器人
      </div>
      <div class="menu-item" @click="navigateTo('ProductExpore')">
        <el-icon name="s-goods"></el-icon>探索机器人
      </div>
      <div class="divider"></div>
      <div class="menu-item" @click="navigateTo('PersonalHome')">
        <el-icon name="s-custom"></el-icon>个人主页
      </div>
      <div class="divider"></div>
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
      <div class="divider"></div>
    </aside>

    <!-- 右侧内容区域 -->
    <el-main>
      <!-- 页头部分 -->
      <el-header class="ourHeader">
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
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'user_id']),
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
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/styles/layout.scss';
.el-main {
  padding: 0px;
}
</style>
