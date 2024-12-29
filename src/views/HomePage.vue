<!-- filepath: /d:/MyGitHub/razor-ai-frontend/src/views/HomePage.vue -->
<template>
  <div class="homepage">
    <!-- Logo 和名称 -->
    <div class="header">
      <img src="@/assets/images/logo.png" alt="Razor AI" class="logo" />
      <h1 class="title">Razor AI</h1>
    </div>

    <!-- 最近使用的机器人选项卡和输入框 -->
    <div class="recent-robots">
      <el-tabs
        v-model="selectedRobot"
        class="recent-tabs"
        @tab-click="handleRobotSelect"
      >
        <el-tab-pane
          v-for="robot in recentRobots"
          :key="robot.id"
          :label="robot.name"
          :name="robot.name"
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
      <div class="robot-groups">
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
              <img :src="robot.icon" alt="icon" class="robot-icon" />
              <div class="robot-info">
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
              <img :src="robot.icon" alt="icon" class="robot-icon" />
              <div class="robot-info">
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
              v-for="robot in avRobots.slice(0, 4)"
              :key="robot.id"
              class="robot-card"
              @click.native="selectRobot(robot)"
            >
              <img :src="robot.icon" alt="icon" class="robot-icon" />
              <div class="robot-info">
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
          <img :src="robot.icon" alt="icon" class="robot-icon" />
          <div class="robot-info">
            <p class="robot-name">{{ robot.name }}</p>
            <p class="robot-description">{{ truncate(robot.description) }}</p>
          </div>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recentRobots: [
        { id: 1, name: '0813' },
        { id: 2, name: 'kimi' },
        { id: 3, name: 'GPT-4o' },
        { id: 4, name: '期末去死！' },
        { id: 5, name: '赌氢凤' },
        { id: 6, name: 'komorebi' },
        { id: 7, name: 'Nolon' },
        { id: 8, name: '-1LL' },
        { id: 9, name: '猫猫' },
        { id: 10, name: '狗狗' },
      ], // 最近使用的机器人
      selectedRobot: null, // 当前选中的机器人
      userInput: '', // 用户输入内容
      textRobots: [
        {
          id: 1,
          name: '文本助手1',
          icon: '@/assets/icons/text1.png',
          description:
            '适合快速文本处理的机器人输入您的问题输入您的问题输入您的问题输入您的问题输入您的问题输入您的问题输入您的问题输入您的问题输入您的问题输入您的问题输入您的问题输入您的问题输入您的问题输入您的问题',
        },
        {
          id: 2,
          name: '文本助手2',
          icon: '@/assets/icons/text2.png',
          description: '可协助生成文案的工具',
        },
        {
          id: 3,
          name: '文本助手3',
          icon: '@/assets/icons/text3.png',
          description: '支持多种文本处理功能',
        },
        {
          id: 4,
          name: '文本助手4',
          icon: '@/assets/icons/text4.png',
          description: '提供文本分析和处理服务',
        },
        {
          id: 5,
          name: '文本助手5',
          icon: '@/assets/icons/text5.png',
          description: '适合快速生成文案的工具',
        },
        {
          id: 6,
          name: '文本助手6',
          icon: '@/assets/icons/text6.png',
          description: '支持多种文本处理功能',
        },
        {
          id: 7,
          name: '文本助手7',
          icon: '@/assets/icons/text7.png',
          description: '提供文本分析和处理服务',
        },
        {
          id: 8,
          name: '文本助手8',
          icon: '@/assets/icons/text8.png',
          description: '适合快速生成文案的工具',
        },
      ],
      imageRobots: [
        {
          id: 1,
          name: '图像生成1',
          icon: '@/assets/icons/image1.png',
          description: '支持多种风格的图片生成',
        },
        {
          id: 2,
          name: '图像生成2',
          icon: '@/assets/icons/image2.png',
          description: '提供多种图像处理功能',
        },
        {
          id: 3,
          name: '图像生成3',
          icon: '@/assets/icons/image3.png',
          description: '适合快速生成图片的工具',
        },
        {
          id: 4,
          name: '图像生成4',
          icon: '@/assets/icons/image4.png',
          description: '支持多种图像生成功能',
        },
      ],
      avRobots: [
        {
          id: 1,
          name: '音视频助手',
          icon: '@/assets/icons/av1.png',
          description: '快速编辑音视频的智能工具',
        },
        {
          id: 2,
          name: '音视频助手2',
          icon: '@/assets/icons/av2.png',
          description: '提供多种音视频处理功能',
        },
        {
          id: 3,
          name: '音视频助手3',
          icon: '@/assets/icons/av3.png',
          description: '支持多种音视频编辑功能',
        },
        {
          id: 4,
          name: '音视频助手4',
          icon: '@/assets/icons/av4.png',
          description: '适合快速编辑音视频的工具',
        },
      ],
      dialogVisible: false, // 对话框是否可见
      dialogType: '', // 对话框类型
      dialogTitle: '', // 对话框标题
      searchKeyword: '', // 搜索关键词
      filteredRobots: [], // 过滤后的机器人列表
    };
  },
  methods: {
    truncate(text, length = 20) {
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
      this.dialogVisible = true;
      this.$message.info(
        `打开${this.dialogTitle}对话框,共有${this.filteredRobots.length}个机器人,${this.dialogVisible}`
      );
    },
    selectRobot(robot) {
      if (!robot || !robot.name) {
        this.$message.error('无法选择机器人，请稍后重试');
        return;
      }
      this.$message.success(`您选择了机器人: ${robot.name}`);
      this.dialogVisible = false;
    },

    getRobotsByType(type) {
      return type === 'text'
        ? this.textRobots
        : type === 'image'
          ? this.imageRobots
          : this.avRobots;
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

  .recent-robots {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;

    .recent-tabs {
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
            width: 20%;
            height: 125px;
            display: flex;
            cursor: pointer;
            padding: 10px; // 内边距
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
                margin: 5px 0;
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
