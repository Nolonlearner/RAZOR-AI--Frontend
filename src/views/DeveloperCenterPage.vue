<!--src/views/DeveloperCenterPage.vue 这个页面展示开发者中心的信息-->
<template>
  <div class="developer-center-page">
    <!-- 动态背景 -->
    <div id="background"></div>

    <!-- 页面标题 -->
    <header class="page-header">
      <h1>开发者中心</h1>
    </header>

    <!-- 开发者统计信息 -->
    <div class="developer-stats">
      <div class="stat-card">
        <h2>{{ robots.length }}</h2>
        <p>开发机器人数量</p>
      </div>
      <div class="stat-card">
        <h2>{{ totalUsers }}</h2>
        <p>累计用户数</p>
      </div>
      <div class="stat-card">
        <h2>#{{ rank }}</h2>
        <p>平台排名</p>
      </div>
    </div>

    <!-- 操作功能 -->
    <div class="actions">
      <button class="action-button" @click="createNewRobot">
        创建新机器人
      </button>
      <button class="action-button" @click="viewTemplates">快速发布模板</button>
    </div>

    <!-- 机器人列表 -->
    <div class="robot-list">
      <h2>我的机器人</h2>
      <div class="robot-grid">
        <div v-for="robot in robots" :key="robot.id" class="robot-card">
          <div class="robot-header">
            <img :src="robot.icon" alt="robot icon" class="robot-icon" />
            <h3 class="robot-name">{{ robot.name }}</h3>
          </div>
          <p class="robot-description">{{ robot.description }}</p>
          <div class="robot-actions">
            <button @click="viewRobotDetails(robot.id)">查看详情</button>
            <button @click="testRobot(robot.id)">测试</button>
            <button @click="debugRobot(robot.id)">调试</button>
            <button @click="publishRobot(robot.id)">发布</button>
            <button @click="deleteRobot(robot.id)">删除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeveloperCenterPage',
  data() {
    return {
      robots: [
        {
          id: 1,
          name: 'AI助手机器人',
          description: '一个提供智能助手功能的机器人。',
          icon: '/assets/icons/assistant.png',
          usageStats: { users: 124, feedback: 98 },
        },
        {
          id: 2,
          name: '翻译机器人',
          description: '多语言实时翻译机器人。',
          icon: '/assets/icons/translator.png',
          usageStats: { users: 215, feedback: 185 },
        },
        // 示例数据
      ],
      totalUsers: 339, // 所有机器人累计用户数
      rank: 12, // 开发者在平台中的排名
    };
  },
  methods: {
    createNewRobot() {
      this.$router.push({ name: 'CreateBots' }); // 跳转到新机器人配置页面
    },
    viewTemplates() {
      this.$router.push('/templates'); // 跳转到快速发布模板页面
    },
    viewRobotDetails(robotId) {
      this.$router.push(`/robot-details/${robotId}`); // 跳转到机器人详情页面
    },
    testRobot(robotId) {
      console.log(`测试机器人 ${robotId}`); // 实际开发中需要调用API
      this.$message({
        message: `机器人 ${robotId} 正在测试中！`,
        type: 'info',
      });
    },
    debugRobot(robotId) {
      console.log(`调试机器人 ${robotId}`);
      this.$message({
        message: `进入机器人 ${robotId} 的调试模式！`,
        type: 'info',
      });
    },
    publishRobot(robotId) {
      console.log(`发布机器人 ${robotId}`);
      this.$message({
        message: `机器人 ${robotId} 已成功发布！`,
        type: 'success',
      });
    },
    deleteRobot(robotId) {
      this.robots = this.robots.filter((robot) => robot.id !== robotId);
      this.$message({
        message: `机器人 ${robotId} 已删除！`,
        type: 'warning',
      });
    },
  },
};
</script>
<style scoped>
/* 整体页面样式 */
.developer-center-page {
  position: relative; /* 相对定位，用于层叠上下文 */
  padding: 20px; /* 内边距为20px */
  font-family: 'Poppins', sans-serif; /* 字体设置为Poppins，如果没有则使用无衬线字体 */
  color: #fff; /* 文本颜色为白色 */
  background: transparent; /* 背景透明，以便动态背景覆盖 */
  min-height: 100vh; /* 最小高度为视窗高度的100% */
  overflow: hidden; /* 隐藏溢出的内容 */
}

/* 动态背景样式 */
#background {
  position: absolute; /* 绝对定位，覆盖整个父元素 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #1e3c72, #2a5298); /* 径向渐变背景 */
  animation: gradient-anim 8s infinite; /* 应用渐变动画，无限循环 */
  z-index: -1; /* 层级设置为-1，确保在内容之下 */
}

@keyframes gradient-anim {
  0% {
    background: radial-gradient(
      circle,
      #1e3c72,
      #2a5298
    ); /* 动画开始时的背景 */
  }
  50% {
    background: radial-gradient(
      circle,
      #2a5298,
      #1e3c72
    ); /* 动画中间时的背景 */
  }
  100% {
    background: radial-gradient(
      circle,
      #1e3c72,
      #2a5298
    ); /* 动画结束时的背景 */
  }
}

/* 标题动画样式 */
.page-header h1 {
  font-size: 3em; /* 字体大小为3em */
  color: #fff; /* 文本颜色为白色 */
  text-align: center; /* 文本居中 */
  animation: slide-in 1.5s ease-out; /* 应用滑动动画，持续1.5秒，缓动效果为ease-out */
}

@keyframes slide-in {
  from {
    transform: translateY(-50px); /* 动画开始时向上移动50px */
    opacity: 0; /* 动画开始时透明度为0 */
  }
  to {
    transform: translateY(0); /* 动画结束时回到原位 */
    opacity: 1; /* 动画结束时透明度为1 */
  }
}

/* 开发者统计信息样式 */
.developer-stats {
  display: flex; /* 弹性盒子布局 */
  justify-content: space-around; /* 子项平均分布 */
  margin-bottom: 30px; /* 底部外边距为30px */
}

.stat-card {
  background: rgba(255, 255, 255, 0.1); /* 背景颜色为半透明白色 */
  border: 1px solid rgba(255, 255, 255, 0.3); /* 边框颜色为半透明白色 */
  border-radius: 10px; /* 边框圆角为10px */
  padding: 20px; /* 内边距为20px */
  text-align: center; /* 文本居中 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 阴影效果 */
  width: 30%; /* 宽度为容器的30% */
  transition:
    transform 0.3s,
    box-shadow 0.3s; /* 变换和阴影的过渡效果 */
}

.stat-card:hover {
  transform: translateY(-10px); /* 鼠标悬停时向上移动10px */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.5); /* 鼠标悬停时阴影效果增强 */
}

.stat-card h2 {
  font-size: 2.5em; /* 字体大小为2.5em */
  color: #ffcc00; /* 文本颜色为黄色 */
  margin: 0; /* 外边距为0 */
}

.stat-card p {
  font-size: 1.2em; /* 字体大小为1.2em */
  margin-top: 10px; /* 顶部外边距为10px */
}

/* 操作按钮样式 */
.actions {
  text-align: center; /* 文本居中 */
  margin-bottom: 30px; /* 底部外边距为30px */
}

.action-button {
  padding: 12px 25px; /* 内边距为12px 25px */
  margin: 0 10px; /* 外边距为0 10px */
  font-size: 1.2em; /* 字体大小为1.2em */
  background: linear-gradient(
    to right,
    #4caf50,
    #81c784
  ); /* 背景为从左到右的线性渐变 */
  color: #fff; /* 文本颜色为白色 */
  border: none; /* 无边框 */
  border-radius: 25px; /* 边框圆角为25px */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  transition:
    transform 0.3s,
    background 0.3s; /* 变换和背景的过渡效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 阴影效果 */
}

.action-button:hover {
  transform: scale(1.1); /* 鼠标悬停时放大1.1倍 */
  background: linear-gradient(
    to right,
    #81c784,
    #4caf50
  ); /* 鼠标悬停时渐变方向相反 */
}

/* 机器人网格布局样式 */
.robot-grid {
  display: grid; /* 网格布局 */
  grid-template-columns: repeat(
    auto-fit,
    minmax(300px, 1fr)
  ); /* 列定义为自动适应，最小宽度300px */
  gap: 20px; /* 网格间距为20px */
}

/* 机器人卡片样式 */
.robot-card {
  background: rgba(255, 255, 255, 0.1); /* 背景颜色为半透明白色 */
  border: 1px solid rgba(255, 255, 255, 0.3); /* 边框颜色为半透明白色 */
  border-radius: 15px; /* 边框圆角为15px */
  padding: 20px; /* 内边距为20px */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 阴影效果 */
  transition:
    transform 0.3s,
    box-shadow 0.3s; /* 变换和阴影的过渡效果 */
}

.robot-card:hover {
  transform: scale(1.05); /* 鼠标悬停时放大1.05倍 */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.5); /* 鼠标悬停时阴影效果增强 */
}

/* 机器人操作按钮样式 */
.robot-actions button {
  padding: 8px 12px; /* 内边距为8px 12px */
  margin: 5px 0; /* 外边距为5px 0 */
  font-size: 1em; /* 字体大小为1em */
  background: linear-gradient(
    to right,
    #1e90ff,
    #87cefa
  ); /* 背景为从左到右的线性渐变 */
  color: white; /* 文本颜色为白色 */
  border: none; /* 无边框 */
  border-radius: 5px; /* 边框圆角为5px */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  transition:
    background 0.3s,
    transform 0.3s; /* 背景和变换的过渡效果 */
}

.robot-actions button:hover {
  background: linear-gradient(
    to right,
    #87cefa,
    #1e90ff
  ); /* 鼠标悬停时渐变方向相反 */
  transform: translateY(-2px); /* 鼠标悬停时向上移动2px */
}
</style>
