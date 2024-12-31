<template>
  <div class="robot-detail-page">
    <div class="robot-header">
      <img :src="robot.icon" alt="Robot Icon" class="robot-icon" />
      <h1>{{ robot.name }}</h1>
      <p class="robot-description">{{ robot.description }}</p>
    </div>
    <div class="subscription-section">
      <el-button type="primary" @click="subscribeRobot">订阅机器人</el-button>
    </div>
  </div>
</template>

<script>
import { fetchAgentDetail as apifetchAgentDetail } from '../utils/api'; // 引入 API 请求
// import { subscribeAgent as apisubscribeAgent } from '../utils/api'; // 引入 API 请求
export default {
  data() {
    return {
      robot: {}, // 机器人详情数据
    };
  },
  created() {
    const agentId = this.$route.params.id;
    if (!agentId) {
      this.$message.error('无法获取机器人信息');
      this.$router.push('/');
    } else {
      this.fetchRobotDetail(agentId);
    }
  },
  methods: {
    async fetchRobotDetail(agentId) {
      try {
        const response = await apifetchAgentDetail(agentId);
        console.log('nolon nolon response:', response);
        this.robot = response.data;
      } catch (error) {
        console.error('获取机器人详情失败:', error);
        this.$message.error('无法加载机器人详情');
      }
    },
    async subscribeRobot() {
      try {
        const response = await this.$axios.post(
          '/api/market/user/agent/subscribe',
          {
            user_id: this.$store.state.user.userId,
            agent_id: this.robot.id,
            startime: new Date().toISOString(),
            duration: 4,
          }
        );
        if (response.status === 200) {
          this.$message.success('订阅成功！');
        } else {
          this.$message.error('订阅失败，请稍后重试。');
        }
      } catch (error) {
        console.error('订阅失败:', error);
        this.$message.error('无法订阅机器人，请稍后重试。');
      }
    },
  },
};
</script>
