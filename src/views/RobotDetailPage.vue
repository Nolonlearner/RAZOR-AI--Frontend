<template>
  <div class="robot-detail-page" v-loading="loading">
    <!-- 头部区域 -->
    <div class="robot-header">
      <div class="robot-icon-container">
        <!-- <img :src="robot.icon" alt="Robot Icon" class="robot-icon" /> -->
        <img
          :src="require('@/assets/images/Agents/detailedAgent.png')"
          alt="Robot Icon"
          class="robot-icon"
        />
      </div>
      <div class="robot-header-content">
        <h1 class="robot-name">{{ robot.name }}</h1>
        <p class="robot-type">
          <el-icon name="s-goods"></el-icon>机器人 类型：{{
            robotType[robot.type] || '未知类型'
          }}
        </p>
        <p class="robot-description">
          <el-icon name="edit-outline"></el-icon>简介: {{ robot.description }}
        </p>
        <p class="robot-creator">
          <el-icon name="user-solid"></el-icon>创建者 ID: {{ robot.creator_id }}
        </p>
      </div>
    </div>

    <!-- 订阅操作 -->
    <div class="subscription-section">
      <el-button
        type="primary"
        class="subscribe-button"
        @click="handleSubscription"
      >
        {{ subscriptionButtonText }}
      </el-button>
    </div>

    <!-- 未来扩展部分 -->
    <div class="robot-extended-info">
      <div class="section-title">更多信息</div>
      <el-divider></el-divider>

      <!-- 使用说明 -->
      <div class="robot-usage-info">
        <h3>使用说明</h3>
        <p>这里将展示详细的使用教程，帮助用户快速上手。</p>
      </div>

      <!-- 博客文章 -->
      <div class="robot-blogs">
        <h3>相关博客文章</h3>
        <p>这里将展示与该机器人相关的博客文章和案例。</p>
      </div>

      <!-- 评论区 -->
      <div class="robot-comments">
        <h3>用户评论</h3>
        <p>评论功能正在开发中，未来会展示用户对该机器人的评价。</p>
      </div>

      <!-- 作者信息 -->
      <div class="robot-creator-info">
        <h3>关于作者</h3>
        <p>作者信息正在完善中，未来会显示作者的简介及其他作品。</p>
      </div>
    </div>
    <!-- 选择订阅时间的弹窗
    <subscription-selector
      v-if="robot.id"
      v-model="isSubscriptionDialogVisible"
      :robotId="robot.id"
      :onConfirm="handleSubscriptionConfirm"
    ></subscription-selector> -->

    <el-dialog
      :visible.sync="isSubscriptionDialogVisible"
      name="订阅机器人"
      :modal="true"
      :close-on-click-modal="false"
      center
      width="30%"
    >
      <subscription-selector
        :robotId="robot.id"
        :onConfirm="handleSubscriptionConfirm"
        :onClose="() => (isSubscriptionDialogVisible = false)"
      />
    </el-dialog>
  </div>
</template>

<script>
import { fetchAgentDetail as apifetchAgentDetail } from '../utils/api'; // 引入 API 请求
import { subscribeAgent as apisubscribeAgent } from '../utils/api';
import agent from '@/store/agent';
import SubscriptionSelector from '@/components/SubscriptionSelector.vue'; // 引入新组件
export default {
  components: {
    SubscriptionSelector,
  },
  data() {
    return {
      robot: {}, // 机器人详情数据
      robotType: {
        1: '文本对话机器人',
        2: '图片生成机器人',
        3: '音视频机器人',
      },
      loading: true, // 是否正在加载数据
      isSubscriptionDialogVisible: false, // 控制弹窗显示
    };
  },
  created() {
    const agentId = this.$route.params.id;
    console.log('agent.state', agent.state);
    if (!agentId) {
      this.$message.error('无法获取机器人信息');
      this.$router.push('/');
    } else {
      this.fetchRobotDetail(agentId);
    }
  },
  computed: {
    subscriptionButtonText() {
      const subscribedRobot = this.$store.state.agent.haveSubscribed.find(
        (r) => r.agent_id === this.robot.id
      );
      return subscribedRobot && subscribedRobot.status
        ? '已订阅，查看对话历史'
        : '未订阅，点击订阅';
    },
  },
  methods: {
    formatDateTime(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    openSubscriptionDialog() {
      this.isSubscriptionDialogVisible = true; // 打开弹窗
    },
    async handleSubscriptionConfirm(duration, points) {
      console.log('订阅时长:', duration);
      console.log('所需积分:', points);
      // 这里可以添加积分检查逻辑

      // 调用订阅方法
      await this.subscribeRobot(duration);
    },
    async fetchRobotDetail(agentId) {
      try {
        const response = await apifetchAgentDetail(agentId);
        this.robot = response.data;
        this.loading = false; // 加载完成
      } catch (error) {
        console.error('获取机器人详情失败:', error);
        this.$message.error('无法加载机器人详情');
      }
    },
    async subscribeRobot(Duration) {
      try {
        const currentTime = this.formatDateTime(new Date()); // 格式化当前时间
        // 构造 payload
        const payload = {
          user_id: this.$store.state.user.userId,
          agent_id: this.robot.id,
          startime: currentTime, // 使用格式化后的时间
          duration: Duration,
        };
        console.log('请求 payload:', payload);
        const response = await apisubscribeAgent(payload);
        if (response.status === 200) {
          this.$message.success('订阅成功！');
          // 订阅成功后，重新获取用户订阅列表
          this.$store.dispatch(
            'agent/fetchUserSubscriptions',
            this.$store.state.user.userId
          );
          console.log('订阅成功!!!:', response);
          console.log(
            '订阅成功后的用户订阅列表:',
            this.$store.state.agent.haveSubscribed
          );
        } else {
          this.$message.error('订阅失败，请稍后重试。');
        }
      } catch (error) {
        console.error('订阅失败:', error);
        this.$message.error('无法订阅机器人，请稍后重试。');
      }
    },
    handleSubscription() {
      const subscribedRobot = this.$store.state.agent.haveSubscribed.find(
        (r) => r.agent_id === this.robot.id
      );

      if (subscribedRobot && subscribedRobot.status) {
        // 已订阅，跳转到查看对话历史页面
        this.$router.push({
          name: 'ConversationHistory',
          params: { id: this.robot.id },
        });
      } else {
        // 未订阅，打开订阅弹窗
        this.openSubscriptionDialog();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins.scss' as *;
@use '@/assets/styles/variables.scss' as *;
.robot-detail-page {
  background-color: $background-color;
  color: $text-color;
  padding: 20px;
  font-family: Arial, sans-serif;

  .robot-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;

    .robot-icon-container {
      width: 100px;
      height: 100px;
      border: 2px solid $border-color;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $card-background-color;

      .robot-icon {
        width: 80%;
        height: auto;
      }
    }

    .robot-header-content {
      .robot-name {
        font-size: 1.8rem;
        font-weight: bold;
        color: $accent-color;
        margin-bottom: 5px;
      }

      .robot-type {
        font-size: 1rem;
        color: $secondary-color;
        margin-bottom: 5px;
      }

      .robot-description {
        font-size: 1rem;
        color: $text-color;
        margin-bottom: 10px;
      }

      .robot-creator {
        font-size: 0.9rem;
        color: $hover-text-color;
      }
    }
  }

  .subscription-section {
    text-align: center;
    margin: 30px 0;

    .subscribe-button {
      background-color: $accent-color;
      color: $primary-color;

      &:hover {
        background-color: $accent-hover-color;
        color: $hover-text-color;
      }
    }
  }

  .robot-extended-info {
    .section-title {
      font-size: 1.5rem;
      color: $accent-color;
      margin-bottom: 10px;
    }

    .robot-usage-info,
    .robot-blogs,
    .robot-comments,
    .robot-creator-info {
      margin: 20px 0;

      h3 {
        font-size: 1.2rem;
        color: $text-color;
      }

      p {
        font-size: 1rem;
        color: $secondary-color;
      }
    }
  }
}
</style>
