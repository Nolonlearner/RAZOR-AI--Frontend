<!--src/views/ChatPage.vue-->
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
        <button class="option-button" @click="toggleOptions">语言模型</button>
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
      <div v-if="showOptions" class="options-menu">
        <ul>
          <li @click="selectOption('kimi')">kimi</li>
          <li @click="selectOption('chatgpt')">chatgpt</li>
          <li @click="selectOption('文心一言')">文心一言</li>
        </ul>
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
      selectedOption: '', // 添加选中的选项
      messages: [],
      userAvatar: 'path_to_user_avatar',
      botAvatar: 'path_to_bot_avatar',
      showOptions: false,
    };
  },
  methods: {
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    selectOption(option) {
      this.selectedOption = option; // 保存选中的选项
      this.newMessage = option; // 选项填入输入框
      this.showOptions = false;
    },
    scrollToBottom() {
      const chatLog = this.$refs.chatlog;
      if (chatLog) {
        console.log('chatLog:', chatLog); // 确保这里能够打印出 DOM 元素
        chatLog.scrollTop = chatLog.scrollHeight; // 滚动到聊天日志的底部
      } else {
        console.error('chatLog is not defined');
      }
    },
    async sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({ text: this.newMessage, type: 'user' });
        const userMessage = this.newMessage;
        const optionMessage = this.selectedOption; // 获取选中的选项
        this.newMessage = '';
        this.selectedOption = ''; // 发送后清空选项

        // 调用后端 API 获取机器人的回复
        //这里一共发送userMessage和optionMessage两个字段
        try {
          const response = await axios.post('YOUR_BACKEND_API_URL', {
            message: userMessage,
            selectedOption: optionMessage, // 发送选项到后端
          });
          this.messages.push({ text: response.data.reply, type: 'bot' });
        } catch (error) {
          console.error('Error fetching bot reply:', error);
          this.messages.push({
            text: '无法接收后端传来的数据。',
            type: 'bot',
          });
          this.scrollToBottom();
        }
      }
    },
    adjustInputWidth() {
      const inputField = this.$refs.inputField;
      const tempSpan = document.createElement('span');
      document.body.appendChild(tempSpan);
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.whiteSpace = 'pre';
      tempSpan.style.font = getComputedStyle(inputField).font;
      tempSpan.textContent = inputField.value || inputField.placeholder;
      inputField.style.width = `${Math.max(100, tempSpan.scrollWidth + 20)}px`;
      document.body.removeChild(tempSpan);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins.scss';
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
  position: relative; /* 使菜单相对于 chat-window 定位 */
  flex: 1; /* 占用剩余空间 */
  margin-top: 20px;
  padding: 10px;
  width: 100%;
  max-width: 1000px; /*最大高度8*/
  border-radius: 10px;
  overflow-y: auto; /* 允许滚动 */
  display: flex;
  flex-direction: column; /* 纵向排列 */
  background-color: #2c2c2c; /* 设置背景颜色 */
}

.chat-log {
  display: flex;
  flex-direction: column; /* 纵向排列消息 */
  overflow-y: auto; /* 允许滚动 */
  padding: 10px;
  flex: 1;
  padding-bottom: 70px; /* 为发送框留出空间 */
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
  padding: 10px; /* 内边距 */
  z-index: 10; /* 确保在其他元素之上 */
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

.option-button {
  margin-right: 10px; /* 与输入框之间的间距 */
  background-color: #007bff; /* 按钮颜色 */
  color: white; /* 按钮字体颜色 */
  border: none; /* 去掉边框 */
  padding: 10px; /* 按钮内边距 */
  border-radius: 4px; /* 圆角 */
  cursor: pointer; /* 鼠标悬停效果 */
}

.options-menu {
  position: absolute; /* 绝对定位 */
  background-color: #2c2c2c; /* 设置为深色背景 */
  border: 1px solid #444; /* 边框 */
  border-radius: 4px; /* 圆角 */
  bottom: 50px;
  left: 0; /* 对齐左侧 */
  z-index: 10; /* 确保菜单在其他元素之上 */
}

.options-menu ul {
  list-style: none; /* 去掉列表样式 */
  padding: 0; /* 去掉内边距 */
  margin: 0; /* 去掉外边距 */
}

.options-menu li {
  padding: 10px; /* 每个选项的内边距 */
  cursor: pointer; /* 鼠标悬停效果 */
  color: white; /* 选项文字颜色 */
}

.options-menu li:hover {
  background-color: #444; /* 悬停效果 */
}
</style>
