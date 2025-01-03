<template>
  <div class="conversation-history">
    <h1 class="title">{{ title }}</h1>
    <div class="actions">
      <el-checkbox v-model="selectAll" @change="toggleSelectAll"
        >全选</el-checkbox
      >
      <el-button
        type="danger"
        @click="confirmDelete"
        :disabled="selectedConversations.length === 0"
        >删除选中</el-button
      >
    </div>
    <div class="history-list">
      <div
        v-for="conversation in conversations"
        :key="conversation.id"
        class="conversation-item"
      >
        <el-checkbox
          v-model="selectedConversations"
          :label="conversation.id"
        ></el-checkbox>
        <div
          class="conversation-details"
          @click="viewConversation(conversation.id)"
        >
          <strong>会话名称:</strong> {{ conversation.name }}
        </div>
      </div>
      <div v-if="conversations.length === 0" class="no-conversations">
        暂无相关的会话。
      </div>
    </div>
    <el-dialog
      title="确认删除"
      :visible.sync="deleteDialogVisible"
      width="30%"
      @close="clearSelection"
    >
      <span>确定要删除选中的对话吗？</span>
      <template #footer>
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="deleteConversations">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { deleteChat as apideleteChat } from '../utils/api'; // 删除对话
export default {
  name: 'ConversationHistory',
  data() {
    return {
      title: '历史对话',
      conversations: [],
      selectedConversations: [],
      deleteDialogVisible: false,
      selectAll: false,
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
    toggleSelectAll() {
      this.selectedConversations = this.selectAll
        ? this.conversations.map((conversation) => conversation.id)
        : [];
    },
    confirmDelete() {
      this.deleteDialogVisible = true;
    },
    async deleteConversations() {
      for (let conversationId of this.selectedConversations) {
        // 删除对话
        try {
          const response = await apideleteChat({
            chat_id: conversationId,
          });
          if (response.status === 200) {
            console.log('删除对话成功:', response);
          } else {
            console.error('删除对话失败:', response);
          }
        } catch (error) {
          console.error('删除对话失败:', error);
        } finally {
          location.reload(); // 刷新页面
        }
        this.conversations = this.conversations.filter(
          (conversation) =>
            !this.selectedConversations.includes(conversation.id)
        );
        this.selectedConversations = [];
        this.deleteDialogVisible = false;
        this.selectAll = false;
      }
    },
    clearSelection() {
      this.selectAll = false;
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
  align-items: center;
}

.actions {
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin: 1em 0;
}

.title {
  font-size: 2.5em;
  text-align: center;
  margin: 1em 0;
}

.history-list {
  display: flex;
  flex-direction: column;
  width: 60%;
  justify-content: center;
  align-items: center;
}

.conversation-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: $small-spacing $base-spacing;
  margin-bottom: $small-spacing;
  background: $hover-background-color;
  border-radius: $border-radius;
  box-shadow: $box-shadow-light;
  cursor: pointer;
}

.conversation-item:hover {
  background: $hover-background-color;
  box-shadow: $box-shadow-medium;
}

.no-conversations {
  color: $secondary-color;
  font-size: $body-font-size;
  margin-top: 1em;
  text-align: center;
}
</style>
