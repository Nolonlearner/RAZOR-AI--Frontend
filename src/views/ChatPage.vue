<template>
  <div class="about-page">
    <title>Robot Center</title>
    <h1 class="title">Robot Chat</h1>
    <p class="second-title">有什么可以帮忙的?</p>
    <div class="chat-window">
      <div class="chat-log" id="chat-log" ref="chatlog">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="{
            'user-message': msg.type === 'user',
            'bot-message': msg.type === 'bot',
          }"
        >
          <img
            :src="msg.type === 'user' ? userAvatar : botAvatar"
            alt="avatar"
            class="avatar"
          />
          <div class="text">{{ msg.text }}</div>
        </div>
      </div>
      <div class="input-container">
        <input
          type="text"
          v-model="newMessage"
          placeholder="输入您感兴趣的东西..."
          @keyup.enter="sendMessage"
          @input="adjustInputWidth"
          ref="inputField"
        />
        <button class="button" @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Chat',
  data() {
    return {
      newMessage: '',
      messages: [],
      userAvatar: 'path_to_user_avatar', // 替换为用户头像 URL
      botAvatar: 'path_to_user_avatar', // 替换为机器人头像 URL
    };
  },
  methods: {
    async sendMessage() {
      if (this.newMessage.trim() !== '') {
        // 添加用户消息到聊天记录
        this.messages.push({ text: this.newMessage, type: 'user' });

        // 清空输入框
        const userMessage = this.newMessage;
        this.newMessage = '';

        // 调用后端 API 获取机器人的回复
        try {
          const response = await axios.post('YOUR_BACKEND_API_URL', {
            message: userMessage,
          });

          // 假设后端返回的格式为 { reply: '机器人回复内容' }
          this.messages.push({ text: response.data.reply, type: 'bot' });
        } catch (error) {
          console.error('Error fetching bot reply:', error);
          this.messages.push({
            text: '无法接收后端传来的数据。',
            type: 'bot',
          });
        }

        // 滚动到最新消息
        this.scrollToBottom();
      }
    },
    adjustInputWidth() {
      const inputField = this.$refs.inputField;
      // 创建一个临时元素
      const tempSpan = document.createElement('span');
      document.body.appendChild(tempSpan);
      tempSpan.style.visibility = 'hidden'; // 隐藏元素
      tempSpan.style.whiteSpace = 'pre'; // 保持空格
      tempSpan.style.font = getComputedStyle(inputField).font; // 获取输入框字体样式
      tempSpan.textContent = inputField.value || inputField.placeholder; // 计算当前输入或占位符的宽度

      // 设置输入框宽度
      inputField.style.width = `${Math.max(100, tempSpan.scrollWidth + 20)}px`; // 20px 是边距

      // 移除临时元素
      document.body.removeChild(tempSpan);
    },
    scrollToBottom() {
      const chatLog = this.$refs.chatLog;
      chatLog.scrollTop = chatLog.scrollHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';

.about-page {
  max-width: 100%; /* 填满整个宽度 */
  height: 100%; /* 填满整个高度 */
  margin: 0; /* 无边距 */
  padding: 20px;
  background-color: #1e1e1e; /* 深色背景 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  color: #ffffff; /* 白色文字 */
  display: flex;
  flex-direction: column; /* 纵向排列 */
  align-items: center; /* 内容居中 */
  overflow-y: auto; /* 允许页面滚动 */
}
.title {
  font-size: 3em;
  text-align: center;
  margin-bottom: 10px;
}
.second-title {
  font-size: 2em;
  text-align: center;
  margin-bottom: 5px;
}
.chat-window {
  flex: 1; /* 占用剩余空间 */
  margin-top: 20px;
  padding: 10px;
  width: 100%;
  max-width: 1000px; /*最大高度8*/
  border-radius: 10px;
  display: flex;
  flex-direction: column; /* 纵向排列 */
  background-color: #2c2c2c; /* 设置背景颜色 */
}

.chat-log {
  display: flex;
  flex-direction: column; /* 纵向排列消息 */
  flex: 1; /* 占用剩余空间 */
  overflow-y: auto; /* 允许滚动 */
  padding: 10px;
  background-color: transparent; /* 使背景透明 */
}

.user-message {
  color: white;
  background-color: #3e3f41;
  margin: 5px 0;
  padding: 8px 12px;
  border-radius: 12px;
  max-width: 50%;
  word-wrap: break-word;
  align-self: flex-end; /* 用户消息右对齐 */
}

.bot-message {
  color: black;
  background-color: #e0e0e0;
  margin: 5px 0;
  padding: 8px 12px;
  border-radius: 12px;
  max-width: 50%;
  word-wrap: break-word;
  align-self: flex-start; /* 机器人消息左对齐 */
}

.input-container {
  display: flex; /* 使用 flexbox 布局 */
  justify-content: center; /* 居中对齐 */
  align-items: center; /* 垂直居中 */
  background-color: #2c2c2c; /* 背景颜色与聊天窗口一致 */
}

input[type='text'] {
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  flex: 1;
  min-width: 150px; /* 最小宽度 */
  background-color: #444; /* 背景颜色 */
  color: white; /* 字体颜色 */
  transition: width 0.2s; /* 动画过渡效果 */
}

button {
  padding: 10px;
  border: none; /* 去掉边框 */
  background-color: #007bff; /* 按钮背景颜色 */
  color: white; /* 按钮字体颜色 */
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3; /* 悬停效果 */
}
</style>
