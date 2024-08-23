<template>
  <div class="layout-container">
    <!-- 左侧菜单栏 -->
    <aside class="sidebar">
      <div class="logo-container">
        <img class="logo" src="@/assets/images/logo.png" alt="Logo" />
        <div class="company-name">ROZAR-AI</div>
      </div>
      <div class="divider"></div>
      <div class="menu-item" @click="navigateTo('Home')">
        <el-icon name="s-home"></el-icon>主页
      </div>
      <div class="divider"></div>
      <div class="menu-item" @click="navigateTo('About')">
        <el-icon name="info"></el-icon>关于我们
      </div>
      <div class="divider"></div>
      <div class="menu-item" @click="navigateTo('PersonalHome')">
        <el-icon name="edit-outline"></el-icon>个人主页
      </div>
      <div class="divider"></div>
      <div class="menu-item" @click="navigateTo('Setting')">
        <el-icon name="setting"></el-icon>设置
      </div>
      <div class="divider"></div>
      <div class="menu-item" @click="navigateTo('Test')">
        <el-icon name="loading"></el-icon>测试
      </div>
      <div class="divider"></div>
    </aside>

    <!-- 右侧内容区域 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(route) {
      if (this.$route.name !== route) {
        this.$router.push({ name: route });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/layout.scss';
</style>
