<!-- src/views/UserSettingPage.vue -->
<template>
  <div class="settings-page">
    <h1 class="title">系统设置</h1>
    <p class="description">在这里修改您的系统设置。</p>

    <div class="setting-group">
      <h2>账户设置</h2>
      <div class="setting-item">
        <label for="switch-account">切换账号:</label>
        <el-button @click="switchAccount">切换</el-button>
      </div>
    </div>

    <div class="setting-group">
      <h2>显示设置</h2>
      <div class="setting-item">
        <label for="mode-switch">切换模式:</label>
        <el-switch
          id="mode-switch"
          v-model="isDarkMode"
          active-text="暗黑模式"
          inactive-text="亮色模式"
          @change="toggleMode"
        ></el-switch>
      </div>
      <div class="setting-item">
        <label for="theme-color">主题颜色:</label>
        <select v-model="themeColor" @change="changeTheme">
          <option value="default">默认</option>
          <option value="blue">蓝色</option>
          <option value="green">绿色</option>
        </select>
      </div>
      <div class="setting-item">
        <label for="language">语言:</label>
        <select v-model="language" @change="changeLanguage">
          <option value="en">英语</option>
          <option value="zh">中文</option>
          <option value="fr">法语</option>
        </select>
      </div>
    </div>

    <div class="setting-group">
      <h2>权限设置</h2>
      <div class="setting-item">
        <label>修改权限:</label>
        <el-button @click="modifyPermissions">修改权限</el-button>
      </div>
    </div>

    <div class="setting-group">
      <h2>历史记录</h2>
      <div class="setting-item">
        <label>查看历史浏览记录:</label>
        <el-button @click="viewHistory">查看</el-button>
      </div>
    </div>

    <div class="button-group">
      <el-button type="primary" @click="saveSettings">保存设置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserSetting',
  data() {
    return {
      isDarkMode: false,
      themeColor: 'default',
      language: 'en',
    };
  },
  methods: {
    switchAccount() {
      // 切换账号的逻辑
      this.$message.info('切换账号功能待实现');
    },
    toggleMode() {
      // 切换模式的逻辑
      this.$message.success(
        `已切换到 ${this.isDarkMode ? '暗黑模式' : '亮色模式'}`
      );
    },
    changeTheme() {
      // 更改主题颜色的逻辑
      this.$message.success(`主题颜色已更改为 ${this.themeColor}`);
    },
    changeLanguage() {
      // 更改语言的逻辑
      this.$message.success(`语言已更改为 ${this.language}`);
    },
    modifyPermissions() {
      // 修改权限的逻辑
      this.$message.info('修改权限功能待实现');
    },
    viewHistory() {
      // 查看历史记录的逻辑
      this.$message.info('查看历史记录功能待实现');
    },
    saveSettings() {
      // 保存设置的逻辑
      console.log('Settings saved:', {
        isDarkMode: this.isDarkMode,
        themeColor: this.themeColor,
        language: this.language,
      });
      this.$message.success('设置已保存！');
    },
  },
};
</script>

<style scoped>
.settings-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1e1e1e; /* 深色背景 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  color: #ffffff; /* 白色文字 */
  animation: fadeIn 0.5s ease; /* 动画效果 */
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

.setting-group {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #2a2a2a; /* 每个设置组的背景 */
  border-radius: 5px; /* 圆角 */
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.setting-item label {
  flex: 1;
  margin-right: 10px;
}

.setting-item select {
  flex: 2;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #444; /* 输入框背景 */
  color: #fff; /* 输入框文字颜色 */
  transition: background-color 0.3s; /* 动画 */
}

.setting-item select:focus {
  background-color: #555; /* 聚焦时的背景颜色 */
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
