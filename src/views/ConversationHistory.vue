<template>
  <div class="conversation-history">
    <h1 class="title">{{ title }}</h1>
    <div class="history-list">
      <div
        v-for="conversation in conversations"
        :key="conversation.id"
        class="conversation-item"
        @click="viewConversation(conversation.id)"
      >
        <strong>会话名称:</strong> {{ conversation.name }}
      </div>
      <div v-if="conversations.length === 0" class="no-conversations">
        暂无相关的会话。
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ConversationHistory',
  data() {
    return {
      title: '历史对话',
      conversations: [],
    };
  },
  mounted() {
    const robotId = this.$route.params.id; // 获取机器人 ID
    for (let chat of this.chats) {
      if (Number(chat.agent_id) === Number(robotId)) {
        this.conversations.push(chat);
      }
    }
  },

  computed: {
    ...mapState('chat', ['chats']), // 从 Vuex 状态中获取 chats
  },
  methods: {
    viewConversation(conversationId) {
      // 跳转到详细对话页面
      this.$router.push({
        name: 'ChatRobot',
        params: { id: conversationId },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins.scss' as *;
@use '@/assets/styles/variables.scss' as *;
.conversation-history {
  background-color: $background-color;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the content horizontally */
}

.title {
  font-size: 2.5em;
  text-align: center;
  margin: 1em 0; /* Add margin for spacing */
}

.history-list {
  display: flex;
  flex-direction: column;
  width: 60%; /* Adjust width for better responsiveness */
  justify-content: center;
  align-items: center; /* Center items horizontally */
}

.conversation-item {
  width: 100%; /* Full width for items */
  display: flex;
  justify-content: space-between;
  padding: $small-spacing $base-spacing;
  margin-bottom: $small-spacing;
  background: $hover-background-color; /* Changed background color */
  border-radius: $border-radius;
  box-shadow: $box-shadow-light; /* Add a subtle shadow */
  cursor: pointer;
}

.conversation-item:hover {
  background: $hover-background-color;
  box-shadow: $box-shadow-medium;
}

.no-conversations {
  color: $secondary-color;
  font-size: $body-font-size;
  margin-top: 1em; /* Space above when no conversations */
  text-align: center;
}
</style>
