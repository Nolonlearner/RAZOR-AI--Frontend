<!--src/views/DeveloperCenterPage.vue 这个页面展示开发者中心的信息-->
<template>
  <div class="developer-center-page">
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
      this.$router.push('/create-new-robot'); // 跳转到新机器人配置页面
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
/* 页面整体样式 */
.developer-center-page {
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
  background: #f4f5f7; /* 背景色 */
  min-height: 100vh;
}

/* 标题 */
.page-header {
  text-align: center;
  margin-bottom: 20px;
}

.page-header h1 {
  font-size: 2.5em;
  color: #3c8dbc;
}

/* 开发者统计信息 */
.developer-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
}

.stat-card {
  background: linear-gradient(135deg, #6a85b6, #bac8e0);
  color: #fff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 30%;
}

.stat-card h2 {
  font-size: 2em;
  margin: 0;
}

.stat-card p {
  font-size: 1.1em;
  margin-top: 10px;
}

/* 操作按钮 */
.actions {
  text-align: center;
  margin-bottom: 20px;
}

.action-button {
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 1em;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #45a049;
}

/* 机器人列表 */
.robot-list {
  margin-top: 20px;
}

.robot-list h2 {
  font-size: 1.8em;
  margin-bottom: 20px;
}

/* 机器人网格布局 */
.robot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

/* 机器人卡片 */
.robot-card {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.robot-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.robot-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.robot-icon {
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 50%;
  border: 2px solid #ddd;
}

.robot-name {
  font-size: 1.5em;
  color: #333;
}

.robot-description {
  font-size: 0.95em;
  color: #666;
  margin-bottom: 10px;
}

/* 机器人操作按钮 */
.robot-actions button {
  padding: 5px 10px;
  margin: 5px 0;
  font-size: 0.9em;
  background-color: #3c8dbc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.robot-actions button:hover {
  background-color: #5ba5e0;
}
</style>
