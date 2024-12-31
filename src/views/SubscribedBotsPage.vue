<template>
  <div class="subscribed-page">
    <h1 class="title">已订阅的机器人</h1>

    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        class="search-input"
        placeholder="搜索机器人名称..."
      />
    </div>

    <div class="robot-list">
      <div
        v-for="robot in filteredRobots"
        :key="robot.agent_id"
        class="robot-card"
      >
        <!-- 条件渲染过期标签 -->
        <div v-if="!robot.status" class="expired-tag">
          <el-icon name="warning"></el-icon>已过期
        </div>
        <div class="robot-info-container">
          <h2 class="robot-name">{{ robot.agent_name }}</h2>
          <img
            :src="require('@/assets/images/Agents/subsAgent.png')"
            alt="机器人图片"
            class="robot-image"
          />
        </div>
        <div class="robot-details">
          <p class="robot-info">开始时间: {{ robot.startime }}</p>
          <p class="robot-info">结束时间: {{ robot.endtime }}</p>
          <p class="robot-info">
            <el-icon name="s-data"></el-icon>
            剩余天数: {{ getRemainingDays(robot.endtime) }} 天
          </p>
        </div>
        <button class="unsubscribe-button" @click="unsubscribe(robot.agent_id)">
          <el-icon name="delete"></el-icon>
          取消订阅
        </button>
        <button class="details-button" @click="viewDetails(robot.agent_id)">
          <el-icon name="info"></el-icon>
          查看详情
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import user from '@/store/user';

export default {
  name: 'SubscribedBotsPage',
  data() {
    return {
      searchQuery: '', // 搜索关键字
    };
  },
  computed: {
    ...mapState('agent', {
      haveSubscribedRobots: (state) => state.haveSubscribed,
    }),
    filteredRobots() {
      if (!this.searchQuery) {
        return this.haveSubscribedRobots;
      }
      return this.haveSubscribedRobots.filter((robot) =>
        robot.agent_name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    ...mapActions('agent', ['fetchUserSubscriptions']),
    unsubscribe(robotId) {
      this.$message({
        message: `取消订阅机器人${robotId}成功！`,
        type: 'success',
      });
    },
    async getUserSubscriptions() {
      try {
        const user_id = user.state.userId;
        await this.fetchUserSubscriptions(user_id);
      } catch (error) {
        console.error('error in getUserSubscriptions:', error);
      }
    },
    viewDetails(agentId) {
      if (!agentId) {
        this.$message.error('无效的机器人信息');
        return;
      }
      this.$router.push({ name: 'RobotDetail', params: { id: agentId } });
    },
    getRemainingDays(endtime) {
      const endDate = new Date(endtime);
      const today = new Date();
      const timeDiff = endDate - today;
      const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // 转换为天数
      return daysRemaining >= 0 ? daysRemaining : 0; // 如果小于0，则返回0
    },
  },
  created() {
    this.getUserSubscriptions(); // 获取用户订阅列表
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins.scss' as *;
@use '@/assets/styles/variables.scss' as *;
.subscribed-page {
  position: relative;
  padding: 20px;
  background-color: $background-color;
  color: $text-color;
  max-width: 100%; /* 填满整个宽度 */
  height: 100%; /* 填满整个高度 */
  overflow: hidden; /* 隐藏溢出内容 */
}

.title {
  font-size: 3.5em;
  margin-bottom: 20px;
  animation: fadeIn 3s ease;
  text-align: center;
}

.search-container {
  margin-bottom: 20px;
  text-align: center;
}

.search-input {
  width: 60%;
  padding: 12px;
  font-size: 1.2em;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.robot-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  max-height: 80vh; /* 设置最大高度 */
  overflow-y: auto; /* 允许垂直滚动 */
}

.robot-card {
  margin-top: 2%;
  background-color: lighten($background-color, 2%);
  padding: 20px;
  border-radius: 12px;
  position: relative; /* 为绝对定位的标签提供参考 */
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.robot-card:hover {
  background-color: darken($background-color, 30%);
  transform: translateY(-5px);
}

.robot-info-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.robot-name {
  font-size: 1.8em;
  margin-bottom: 10px;
  color: #ffdd57;
}

.robot-image {
  width: 50px; /* 设置适中的宽度 */
  height: 50px; /* 设置高度与名字相同 */
  border-radius: 50%; /* 圆形图片 */
  margin-left: 10px; /* 图片与名字之间的间距 */
}

.robot-info {
  font-size: 1em;
  margin-bottom: 10px;
  color: $text-color;
}

.robot-details {
  margin-top: 10px;
}

.unsubscribe-button {
  padding: 10px 15px;
  background-color: #ff4d4f;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.unsubscribe-button:hover {
  background-color: #ff7875;
}

.details-button {
  padding: 10px 15px;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10px;
}

.details-button:hover {
  background-color: #66bb6a;
}

.expired-tag {
  position: absolute; /* 绝对定位 */
  top: 10px; /* 距离卡片顶部10px */
  right: 10px; /* 距离卡片右侧10px */
  background-color: #ff4d4f; /* 背景颜色 */
  color: white; /* 字体颜色 */
  padding: 5px 10px; /* 内边距 */
  border-radius: 5px; /* 圆角 */
  font-size: 0.9em; /* 字体大小 */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
