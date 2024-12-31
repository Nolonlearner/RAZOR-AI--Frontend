<template>
  <div class="subscribed-page">
    <div class="animated-background"></div>
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
        v-for="robot in haveSubscribedRobots"
        :key="robot.agent_id"
        class="robot-card"
      >
        <h2 class="robot-name">{{ robot.agent_name }}</h2>
        <p class="robot-info">开始时间: {{ robot.startime }}</p>
        <p class="robot-info">结束时间: {{ robot.endtime }}</p>
        <button class="unsubscribe-button" @click="unsubscribe(robot.agent_id)">
          取消订阅
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
  },
  created() {
    this.getUserSubscriptions(); // 获取用户订阅列表
  },
};
</script>

<style scoped>
.subscribed-page {
  position: relative;
  padding: 20px;
  color: #ffffff; /* 白色文字 */
  height: 100vh; /* 满屏高度 */
  overflow: hidden; /* 隐藏溢出内容 */
}

.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(270deg, #f4f3f3, #4d4d4d, #3a3a3a, #2a2a2a);
  background-size: 400% 400%;
  animation: gradientAnimation 20s ease infinite;
  z-index: -1; /* 背景层级在后 */
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
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
}

.robot-card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.robot-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
}

.robot-name {
  font-size: 1.8em;
  margin-bottom: 10px;
  color: #ffdd57;
}

.robot-info {
  font-size: 1em;
  margin-bottom: 10px;
  color: #ddd;
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
