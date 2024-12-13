<!--src/views/DeveloperCenterPage.vue 这个页面展示开发者中心的信息-->
<template>
  <div class="developer-center-page">
    <h1 class="title">开发者中心</h1>

    <!-- 开发者统计信息 -->
    <div class="developer-stats">
      <p>开发机器人数量：{{ robots.length }}</p>
      <p>累计用户数：{{ totalUsers }}</p>
      <p>平台排名：{{ rank }}</p>
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
.developer-center-page {
  position: relative;
  padding: 20px;
  color: #000000;
  height: 100vh; /* 满屏高度 */
  overflow: hidden; /* 隐藏溢出内容 */
}

.title {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.developer-stats {
  margin-bottom: 30px;
  font-size: 1.2em;
}

.actions {
  margin-bottom: 20px;
}

.action-button {
  padding: 10px 15px;
  margin-right: 10px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.action-button:hover {
  background-color: #66b1ff;
}

.robot-list {
  margin-top: 20px;
}

.robot-card {
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.robot-header {
  display: flex;
  align-items: center;
}

.robot-icon {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.robot-name {
  font-size: 1.5em;
}

.robot-description {
  margin: 10px 0;
  color: #666;
}

.robot-actions button {
  margin: 5px;
  padding: 5px 10px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.robot-actions button:hover {
  background-color: #66b1ff;
}
</style>
