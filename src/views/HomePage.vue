<!-- filepath: /d:/MyGitHub/razor-ai-frontend/src/views/HomePage.vue -->
<template>
  <div class="homepage">
    <!-- Logo 和名称 -->
    <div class="header">
      <img src="@/assets/images/logo.png" alt="Razor AI" class="logo" />
      <h1 class="title">Razor AI</h1>
    </div>

    <!-- 已经订阅的机器人选项卡和输入框 -->
    <div class="subscribed-robots">
      <el-tabs
        v-model="selectedRobot"
        class="subscribed-tabs"
        @tab-click="handleRobotSelect"
      >
        <el-tab-pane
          v-for="robot in haveSubscribed"
          :key="robot.agent_id"
          :label="robot.agent_name"
          :name="robot.agent_name"
        >
        </el-tab-pane>
      </el-tabs>
      <div class="chat-input-section">
        <el-input
          v-model="userInput"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="输入您的问题..."
          class="chat-input"
          clearable
        ></el-input>
        <el-button class="send-button" type="info" icon="el-icon-upload2"
          >发送</el-button
        >
      </div>
    </div>

    <!-- 官方机器人列表 -->
    <div class="robot-section">
      <h2 class="section-title">官方机器人</h2>
      <div class="robot-groups" v-if="loading">
        <!-- 文本机器人 -->
        <div class="robot-group">
          <h3 class="robot-group-intro">
            <el-icon name="document"></el-icon>文本对话机器人
          </h3>
          <div class="robot-cards">
            <el-card
              v-for="robot in textRobots.slice(0, 4)"
              :key="robot.id"
              class="robot-card"
              @click.native="selectRobot(robot)"
            >
              <div class="robot-info">
                <img
                  :src="require('@/assets/images/Agents/textAgent.png')"
                  alt="icon"
                  class="robot-icon"
                />
                <p class="robot-name">{{ robot.name }}</p>
                <p class="robot-description">
                  {{ truncate(robot.description) }}
                </p>
              </div>
            </el-card>
            <el-link class="view-more" @click="openDialog('text')"
              >查看更多</el-link
            >
          </div>
        </div>
        <!-- 图像机器人 -->
        <div class="robot-group">
          <h3 class="robot-group-intro">
            <el-icon name="picture-outline"></el-icon>图片生成机器人
          </h3>
          <div class="robot-cards">
            <el-card
              v-for="robot in imageRobots.slice(0, 4)"
              :key="robot.id"
              class="robot-card"
              @click.native="selectRobot(robot)"
            >
              <div class="robot-info">
                <img
                  :src="require('@/assets/images/Agents/imageAgent.png')"
                  alt="icon"
                  class="robot-icon"
                />
                <p class="robot-name">{{ robot.name }}</p>
                <p class="robot-description">
                  {{ truncate(robot.description) }}
                </p>
              </div>
            </el-card>
            <el-link class="view-more" @click="openDialog('image')"
              >查看更多</el-link
            >
          </div>
        </div>
        <!-- 音视频机器人 -->
        <div class="robot-group">
          <h3 class="robot-group-intro">
            <el-icon name="video-camera" />音视频机器人
          </h3>
          <div class="robot-cards">
            <el-card
              v-for="robot in videoRobots.slice(0, 4)"
              :key="robot.id"
              class="robot-card"
              @click.native="selectRobot(robot)"
            >
              <div class="robot-info">
                <img
                  :src="require('@/assets/images/Agents/videoAgent.png')"
                  alt="icon"
                  class="robot-icon"
                />
                <p class="robot-name">{{ robot.name }}</p>
                <p class="robot-description">
                  {{ truncate(robot.description) }}
                </p>
              </div>
            </el-card>
            <el-link class="view-more" @click="openDialog('av')"
              >查看更多</el-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" center>
      <el-input
        v-model="searchKeyword"
        placeholder="搜索机器人"
        class="search-input"
        clearable
        @input="filterRobots"
      ></el-input>
      <div class="dialog-robot-list">
        <el-card
          v-for="robot in filteredRobots"
          :key="robot.id"
          class="dialog-robot-card"
          @click.native="selectRobot(robot)"
        >
          <div class="robot-info">
            <img
              :src="require('@/assets/images/Agents/baseAgent.png')"
              alt="icon"
              class="robot-icon"
            />
            <p class="robot-name">{{ robot.name }}</p>
            <p class="robot-description">{{ truncate(robot.description) }}</p>
          </div>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import user from '@/store/user';
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      selectedRobot: null, // 当前选中的机器人
      userInput: '', // 用户输入内容
      dialogVisible: false, // 对话框是否可见
      dialogType: '', // 对话框类型
      dialogTitle: '', // 对话框标题
      searchKeyword: '', // 搜索关键词
      filteredRobots: [], // 过滤后的机器人列表
      loading: true, // 加载状态
    };
  },
  computed: {
    ...mapState('agent', {
      textRobots: (state) => state.textAgents,
      imageRobots: (state) => state.imageAgents,
      videoRobots: (state) => state.videoAgents,
      haveSubscribed: (state) => state.haveSubscribed,
    }),
  },
  created() {
    this.getAllAgentsData(); // 获取所有机器人数据
    this.getUserSubscriptions(); // 获取用户订阅列表
  },
  methods: {
    ...mapActions('agent', [
      'fetchAllAgentsData',
      'fetchAgentDetail',
      'fetchUserSubscriptions',
    ]),
    async getAllAgentsData() {
      this.loading = false; // 开始加载
      try {
        const response = await this.fetchAllAgentsData();
        console.log('response from getAllAgentsData:', response);
      } catch (error) {
        console.error('error in fetchAllAgentsData:', error);
      } finally {
        this.loading = true; // 结束加载
      }
    },
    async getAgentDetail(agentId) {
      try {
        const response = await this.fetchAgentDetail(agentId);
        console.log('response from getAgentDetail:', response);
        return response;
      } catch (error) {
        console.error('error in fetchAgentDetail:', error);
      }
    },
    async getUserSubscriptions() {
      try {
        const user_id = user.state.userId;
        console.log('user_id:', user_id);
        const response = await this.fetchUserSubscriptions(user_id);
        console.log('response from getUserSubscriptions:', response);
      } catch (error) {
        console.error('error in getUserSubscriptions:', error);
      }
    },
    truncate(text, length = 20) {
      if (text === null || text === undefined) {
        return '';
      }
      return text.length > length ? text.slice(0, length) + '...' : text;
    },
    sendMessage() {
      if (this.userInput.trim() && this.selectedRobot) {
        this.$message.success(
          `已向机器人 ${this.selectedRobot} 发送消息: ${this.userInput}`
        );
        this.userInput = '';
      } else {
        this.$message.warning('请选择机器人并输入内容');
      }
    },
    filterRobots() {
      const keyword = this.searchKeyword.toLowerCase();
      this.filteredRobots = this.getRobotsByType(this.dialogType).filter(
        (robot) =>
          robot.name.toLowerCase().includes(keyword) ||
          robot.description.toLowerCase().includes(keyword)
      );
    },
    handleRobotSelect(tab) {
      this.selectedRobot = tab.name; // 当前选择机器人
      this.$message.info(`已切换至机器人: ${this.selectedRobot}`);
    },

    openDialog(type) {
      this.dialogType = type;
      this.dialogTitle =
        type === 'text'
          ? '文本对话机器人'
          : type === 'image'
            ? '图片生成机器人'
            : '音视频机器人';
      this.filteredRobots = this.getRobotsByType(type);
      console.log('filteredRobots:', this.filteredRobots);
      this.dialogVisible = true;
      this.$message.info(
        `打开${this.dialogTitle}对话框,共有${this.filteredRobots.length}个机器人,${this.dialogVisible}`
      );
    },
    async selectRobot(robot) {
      if (!robot || !robot.name) {
        this.$message.error('无法选择机器人，请稍后重试');
        return;
      }
      try {
        const response = await this.getAgentDetail(robot.id);
        if (response.success) {
          this.$message.success(`已选择机器人: ${robot.name}`);
          this.dialogVisible = false;
        } else {
          this.$message.error('选择机器人失败，请稍后重试');
        }
      } catch (error) {
        console.error('error in selectRobot:', error);
      }
    },

    getRobotsByType(type) {
      return type === 'text'
        ? this.$store.state.agent.textAgents
        : type === 'image'
          ? this.$store.state.agent.imageAgents
          : this.$store.state.agent.videoAgents;
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;
.homepage {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;

    .logo {
      width: 100px;
      height: 100px;
    }

    .title {
      font-size: 2rem;
      color: $primary-color;
    }
  }

  .subscribed-robots {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;

    .subscribed-tabs {
      width: 100%;
    }

    .chat-input {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 0px;
    }
  }

  .robot-section {
    width: 100%;

    .section-title {
      font-size: 1.75rem;
      margin-top: 0;
      margin-bottom: 10px;
      text-align: center; // 文本居中
    }

    .robot-groups {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .robot-group {
        .robot-group-intro {
          font-size: 1rem;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .robot-cards {
          display: flex;
          align-items: center; // 水平居中
          gap: 0.75rem;

          .robot-card {
            width: 15vw; // 卡片宽度
            height: 150px;
            display: flex;
            justify-content: center; // 内容居中
            padding: 10px;
            cursor: pointer;
            padding: 5px; // 内边距
            &:hover {
              /* 鼠标悬停时变换颜色 */
              background-color: $primary-color;
            }

            .robot-icon {
              width: 50px;
              height: 50px;
            }

            .robot-info {
              text-align: center;

              .robot-name {
                font-weight: bold;
                margin: 3px 0;
              }

              .robot-description {
                font-size: 0.875rem;
                color: $text-color;
              }
            }
          }

          .view-more {
            align-self: flex-end;
          }
        }
      }
    }
  }
  .chat-input-section {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;

    .chat-input {
      flex: 1;
      margin-right: 10px;
    }

    .send-button {
      width: 15%;
      height: 100%;
    }
  }
  .dialog-robot-list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .dialog-robot-card {
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        /* 鼠标悬停时变换颜色 */
        background-color: $primary-color;
      }

      .robot-icon {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }

      .robot-info {
        .robot-name {
          font-size: 14px;
          font-weight: bold;
        }

        .robot-description {
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
}
</style>
