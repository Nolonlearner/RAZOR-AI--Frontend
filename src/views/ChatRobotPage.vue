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
            'message-wrapper': true,
            'user-message-wrapper': msg.role === 'user',
            'bot-message-wrapper': msg.role === 'assistant',
          }"
        >
          <!-- 机器人消息头像 -->
          <img
            v-if="msg.role === 'assistant'"
            :src="botAvatar"
            alt="avatar"
            class="avatar"
          />
          <!-- 消息气泡框 -->
          <div
            :class="{
              'message-bubble': true,
              'user-message': msg.role === 'user',
              'bot-message': msg.role === 'assistant',
            }"
          >
            {{ msg.content }}
          </div>
          <!-- 用户消息头像 -->
          <img
            v-if="msg.role === 'user'"
            :src="userAvatar"
            alt="avatar"
            class="avatar"
          />
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
import { closeChat as apicloseChat } from '../utils/api'; // 关闭对话
import { saveChatHistory as apisaveChatHistory } from '../utils/api'; // 保存对话
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
    // console.log('mounted每次都会执行哦');
  },

  async beforeDestroy() {
    // 离开页面时关闭对话
    const id = this.currentChat.id;
    console.log('关闭对话的id:', id);
    // 保存旧对话记录
    const saveresponse = await apisaveChatHistory({ chat_id: id });
    if (saveresponse.status === 200) {
      console.log('保存旧对话记录成功！:', saveresponse);
    } else {
      console.error('保存旧对话记录失败！:', saveresponse);
    }
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
    // '$route.params.id'(newId, oldId) {
    //   this.chatId = newId;
    //   console.log('Updated Chat ID:', oldId, 'to', this.chatId);
    //   console.log('watch每次都会执行哦');
    //   this.getChatHistory();
    //   this.createOrFetchChat();
    // },
    '$route.params.id': {
      async handler(newId, oldId) {
        this.chatId = newId;
        console.log('Updated Chat ID:', oldId, 'to', this.chatId);
        console.log('watch每次都会执行哦');

        if (oldId) {
          // 保存旧对话记录
          const saveresponse = await apisaveChatHistory({ chat_id: oldId });
          if (saveresponse.status === 200) {
            console.log('保存旧对话记录成功！:', saveresponse);
          } else {
            console.error('保存旧对话记录失败！:', saveresponse);
          }

          // 关闭旧对话
          console.log('关闭旧对话:', oldId);
          const response = await apicloseChat({ chat_id: oldId });
          if (response.status === 200) {
            console.log('关闭旧对话成功！:', response);
          } else {
            console.error('关闭旧对话失败！:', response);
          }
        }
        // 更新当前聊天ID
        this.chatId = newId;
        // 获取聊天记录和当前对话信息
        await this.getChatHistory();
        await this.createOrFetchChat();
      },
      immediate: true, // 立即执行
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
          this.messages.push({
            content: '对不起，当前机器人宕机啦。',
            role: 'assistant',
          });
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
  background: linear-gradient(135deg, #2c2c2c, #1a1a1a);
  color: $text-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', sans-serif;
}

.title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.chat-info {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  width: 50%;
  max-width: 900px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.chat-info-header {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: $accent-color;
  text-align: center;
}

.chat-info-content {
  font-size: 1.2rem;
  color: #333;
  text-align: center;
}

.chat-window {
  position: relative;
  flex: 1;
  margin-top: 20px;
  padding: 15px;
  width: 100%;
  max-width: 1000px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  background-color: #333;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

.chat-log {
  display: flex;
  flex-direction: column;
  padding: 10px;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #444 transparent;
}

.chat-log::-webkit-scrollbar {
  width: 8px;
}

.chat-log::-webkit-scrollbar-thumb {
  background-color: #444;
  border-radius: 4px;
}

/* 消息容器样式 */
.message-wrapper {
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
}

.user-message-wrapper {
  justify-content: flex-end;
}

.bot-message-wrapper {
  justify-content: flex-start;
}

/* 头像样式 */
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* 消息气泡框样式 */
.message-bubble {
  max-width: 60%;
  padding: 12px 16px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  word-wrap: break-word;
  font-size: 1rem;
}

.user-message .message-bubble {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
}

.bot-message .message-bubble {
  background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
  color: #333;
}

.user-message,
.bot-message {
  margin: 10px 0;
  padding: 12px 16px;
  border-radius: 20px;
  max-width: 60%;
  word-wrap: break-word;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.user-message {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  align-self: flex-end;
}

.bot-message {
  background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
  color: #333;
  align-self: flex-start;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #444;
  padding: 15px;
  border-radius: 10px;
  margin-top: 10px;
}

input[type='text'] {
  padding: 12px;
  border: none;
  border-radius: 8px;
  flex: 1;
  min-width: 200px;
  background-color: #555;
  color: white;
  font-size: 1rem;
  transition: all 0.3s;
}

input[type='text']:focus {
  outline: none;
  background-color: #666;
}

button {
  padding: 12px 20px;
  border: none;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 10px;
  transition: all 0.3s;
}

button:hover {
  background: linear-gradient(135deg, #0056b3, #003d7a);
}

button:active {
  transform: scale(0.95);
}
</style>
