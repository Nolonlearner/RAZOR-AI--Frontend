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
      <div v-for="robot in filteredRobots" :key="robot.id" class="robot-card">
        <h2 class="robot-name">{{ robot.name }}</h2>
        <p class="robot-description">{{ robot.description }}</p>
        <button class="unsubscribe-button" @click="unsubscribe(robot.id)">
          取消订阅
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SubscribedBotsPage',
  data() {
    return {
      robots: [
        { id: 1, name: '论文助手', description: '可以帮助你撰写日常学科论文' },
        {
          id: 2,
          name: '聊天高手',
          description: '还在为如何与人交流烦恼吗？聊天高手告诉你如何做！',
        },
        { id: 3, name: '机器人', description: '这是该机器人的描述' },
      ], //存储所有订阅的机器人
      searchQuery: '', // 搜索关键字
    };
  },
  computed: {
    // 根据搜索关键字过滤机器人
    filteredRobots() {
      return this.robots.filter((robot) =>
        robot.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    // 获取已订阅机器人列表
    fetchSubscribedRobots() {
      axios
        .get('http://101.37.88.111:5000/subscribed') // 替换为真实的API地址
        .then((response) => {
          this.robots = response.data;
        })
        .catch((error) => {
          console.error('获取机器人列表失败:', error);
        });
    },
    // 取消订阅机器人
    unsubscribe(robotId) {
      // axios
      //   .post(`http://101.37.88.111:5000/unsubscribe`, { id: robotId })
      //   .then(() => {
      //     this.robots = this.robots.filter((robot) => robot.id !== robotId);
      //     alert('取消订阅成功！');
      //   })
      //   .catch((error) => {
      //     console.error('取消订阅失败:', error);
      //   });
      // 模拟取消订阅，实际开发中需要调用后端API
      // 此处要说出来取消订阅了哪些机器人，“取消订阅RobotId成功！”
      this.$message({
        message: `取消订阅机器人${robotId}成功！`,
        type: 'success',
      });
    },
  },
  mounted() {
    this.fetchSubscribedRobots();
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
  background: linear-gradient(270deg, #101820, #34577e, #29a19c, #8dd1e1);
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
  font-size: 3em;
  margin-bottom: 20px;
  animation: fadeIn 3s ease;
}

.search-container {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 1.2em;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.robot-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.robot-card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.robot-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
}

.robot-name {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.robot-description {
  font-size: 1em;
  margin-bottom: 20px;
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
/*
之后的改进方向：
图标支持：为每个机器人增加了图标，增强视觉效果。
排序功能：支持根据名称、上次使用时间、使用频率排序。
“上次使用时间”和“使用频率”：显示更多详细信息，增加可读性。
交互优化：悬浮时增强阴影效果，搜索与排序结合。
API支持：扩展了获取和删除订阅的接口，方便未来集成
机器人详情的模态框弹窗
分页展示机器人列表
*/
</style>
