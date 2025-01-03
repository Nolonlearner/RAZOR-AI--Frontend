<template>
  <div class="chat-page">
    <title>Robot Center</title>
    <h1 class="title">Robot Chat</h1>
    <div class="chat-info">
      <div class="chat-info-header">
        <strong>当前对话信息</strong>
      </div>
      <div class="chat-info-content">
        <div><strong>机器人名称:</strong> {{ currentChat.agent_name }}</div>
        <div><strong>会话名称:</strong> {{ currentChat.name }}</div>
      </div>
    </div>
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
          <div class="text">{{ msg.content }}</div>
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
// import { deleteChat as apideleteChat } from '../utils/api'; // 删除对话
import { closeChat as apicloseChat } from '../utils/api'; // 关闭对话
// import { saveChatHistory as apisaveChatHistory } from '../utils/api'; // 保存对话
import { sendMessage as apisendMessage } from '../utils/api'; // 发送消息
import { createChat as apicreateChat } from '../utils/api'; // 创建对话
import { mapActions } from 'vuex';

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

  mounted() {
    this.chatId = this.$route.params.id;
    this.getChatHistory();
    console.log('mounted每次都会执行哦');
  },

  async beforeDestroy() {
    // 离开页面时关闭对话
    const id = this.currentChat.id;
    console.log('关闭对话的id:', id);
    const response = await apicloseChat({ chat_id: id });
    if (response.status === 200) {
      console.log('关闭对话:', response);
    } else {
      console.error('关闭对话失败:', response);
    }
    // this.saveChatHistory();
  },

  async created() {
    this.chatId = this.$route.params.id;
    console.log('Chat ID:', this.chatId);
    await this.getChatHistory(); // 先获取聊天记录和当前对话信息
    console.log('created每次都会执行哦');
    await this.createOrFetchChat(); // 创建或获取对话
  },
  watch: {
    '$route.params.id'(newId, oldId) {
      this.chatId = newId;
      console.log('Updated Chat ID:', oldId, 'to', this.chatId);
      console.log('watch每次都会执行哦');
      this.getChatHistory();
      this.createOrFetchChat();
    },
  },
  methods: {
    ...mapActions('chat', ['getChatByID']),
    async getChatHistory() {
      try {
        this.currentChat = await this.getChatByID(this.chatId);
        console.log('currentChat Info:', this.currentChat);
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
    async createOrFetchChat() {
      try {
        const requestBody = {
          agent_id: this.currentChat.agent_id,
          user_id: this.currentChat.user_id,
          name: this.currentChat.name,
        };
        if (this.currentChat.id) {
          requestBody.chat_id = this.currentChat.id; // 如果是历史会话需要 chat_id
        }
        console.log('创建会话的请求体:', requestBody);
        const response = await apicreateChat(requestBody); // 创建会话
        if (response.status === 200) {
          console.log('会话创建成功:', response);
        } else {
          console.error('会话创建失败:', response);
        }
      } catch (error) {
        console.error('会话创建失败:', error);
      }
    },
    scrollToBottom() {
      const lastMessage = this.$refs.chatlog.lastElementChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth' });
      }
    },
    async sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({ content: this.newMessage, role: 'user' });
        const payload = {
          chat_id: this.currentChat.id,
          content: this.newMessage,
        };
        console.log('发送消息的请求体:', payload);
        try {
          const response = await apisendMessage(payload);
          if (response.status === 200) {
            console.log('发送消息成功!!!:', response);
            this.messages.push({
              content: response.data.content,
              role: 'assistant',
            });
          } else {
            console.error('发送消息失败!!!:', response);
            this.messages.push({
              content: '对不起，我宕机啦。',
              role: 'assistant',
            });
          }
        } catch (error) {
          console.error('发送消息失败:', error);
        }
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
  height: auto;
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

.chat-info {
  background-color: rgba(255, 255, 255, 0.907);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  width: 50%;
  max-width: 900px;
}

.chat-info-header {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: $accent-color;
  text-align: center;
}

.chat-info-content {
  font-size: 1.2em;
  color: $text-color;
  text-align: center;
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
