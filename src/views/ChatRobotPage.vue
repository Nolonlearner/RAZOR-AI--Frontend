<template>
  <div class="chat-page">
    <title>Robot Center</title>
    <h1 class="title">Robot Chat</h1>
    <p class="second-title">可以开始对话了</p>
    <div class="chat-window">
      <div class="chat-log" id="chat-log" ref="chatlog">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="{
            'user-message': msg.role === 'user',
            'bot-message': msg.role === 'assistant',
          }"
        >
          <img
            :src="msg.role === 'user' ? userAvatar : botAvatar"
            alt="avatar"
            class="avatar"
          />
          <div class="text" ref="test">{{ msg.content }}</div>
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
import { fetchChatDetailedHistory as apifetchChatDetailedHistory } from '../utils/api';
import { mapActions } from 'vuex'; // 引入 mapGetters, mapActions
export default {
  name: 'ChatRobot',
  data() {
    return {
      newMessage: '',
      messages: [],
      userAvatar: require('@/assets/images/Avatar/User.png'),
      botAvatar: require('@/assets/images/Avatar/Assistant.png'),
      currentChat: null,
    };
  },
  created() {
    this.chatId = this.$route.params.id;
    console.log('Chat ID:', this.chatId);
    this.getChatHistory();
  },
  watch: {
    '$route.params.id'(newId, oldId) {
      // 当路由的 id 变化时，更新 chatId 并获取聊天记录
      this.chatId = newId;
      console.log('Updated Chat ID:', oldId, 'to', this.chatId);
      this.getChatHistory();
    },
  },
  methods: {
    ...mapActions('chat', ['getChatByID']), // 映射 actions, 用于设置当前聊天
    async getChatHistory() {
      try {
        this.currentChat = await this.getChatByID(this.chatId);
        // console.log('获取当前聊天记录', this.currentChat);
        console.log('当前聊天的agent_id', this.currentChat.agent_id);
        console.log('当前聊天的user_id', this.currentChat.user_id);
        console.log('当前聊天的chat_id', this.currentChat.id);
        console.log('当前聊天的agent_name', this.currentChat.agent_name);
        console.log('当前聊天的name', this.currentChat.name);
      } catch (error) {
        console.error('获取聊天记录失败:', error);
      }
      try {
        const response = await apifetchChatDetailedHistory({
          chat_id: this.chatId,
        });
        console.log('获取聊天记录成功：', response);
        this.messages = response.data;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      } catch (error) {
        console.error('获取聊天记录失败：', error);
      }
    },
    scrollToBottom() {
      const lastMessage = this.$refs.chatlog.lastElementChild; // 获取最后一条消息
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth' }); // 滚动到最后一条消息
      }
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({ content: this.newMessage, role: 'user' });
        this.messages.push({
          content: '这是一个机器人回复',
          role: 'assistant',
        });
        this.newMessage = '';
        this.$nextTick(() => {
          this.scrollToBottom();
        });
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
@use '@/assets/styles/mixins.scss' as *;
@use '@/assets/styles/variables.scss' as *;
.chat-page {
  max-width: 100%;
  height: auto; // 适应内容高度,这样子可以自行下滑
  margin: 0;
  padding: 20px;
  background-color: $background-color;
  color: $text-color;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  position: relative;
  flex: 1;
  margin-top: 20px;
  padding: 10px;
  width: 100%;
  max-width: 1000px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: #2c2c2c;
}

.chat-log {
  display: flex;
  flex-direction: column;
  padding: 10px;
  flex: 1;
  background-color: transparent;
}

.user-message,
.bot-message {
  color: $text-color;
  margin: 5px 0;
  padding: 8px 12px;
  border-radius: 12px;
  max-width: 50%;
  word-wrap: break-word;
}

.user-message {
  background-color: darken($accent-color, 10%);
  align-self: flex-end;
}

.bot-message {
  background-color: $accent-color;
  align-self: flex-start;
}

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c2c2c;
  padding: 10px;
  z-index: 10;
}

input[type='text'] {
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  flex: 1;
  min-width: 150px;
  background-color: #444;
  color: white;
  transition: width 0.2s;
}

button {
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
