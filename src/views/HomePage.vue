<!-- filepath: /d:/MyGitHub/razor-ai-frontend/src/views/HomePage.vue -->
<template>
  <div class="homepage">
    <!-- Logo 和名称 -->
    <div class="header">
      <img src="@/assets/images/logo.png" alt="Razor AI" class="logo" />
      <h1 class="title">Razor AI</h1>
    </div>

    <!-- 选项卡和输入框 -->
    <div class="chat-section">
      <el-tabs v-model="activeTab" class="chat-tabs">
        <el-tab-pane label="Assistant" name="assistant"></el-tab-pane>
        <el-tab-pane label="Kimi" name="kimi"></el-tab-pane>
        <el-tab-pane label="其他机器人" name="others"></el-tab-pane>
        <el-tab-pane label="更多" name="more"></el-tab-pane>
      </el-tabs>
      <el-input
        v-model="userInput"
        placeholder="输入您的问题..."
        class="chat-input"
        clearable
      ></el-input>
    </div>

    <!-- 官方机器人列表 -->
    <div class="robot-section">
      <h2 class="section-title">官方机器人</h2>
      <div class="robot-groups">
        <div class="robot-group">
          <h3>文本对话机器人</h3>
          <div class="robot-cards">
            <el-card
              v-for="robot in textRobots"
              :key="robot.id"
              class="robot-card"
            >
              <img :src="robot.icon" alt="icon" class="robot-icon" />
              <div class="robot-info">
                <p class="robot-name">{{ robot.name }}</p>
                <p class="robot-description">
                  {{ truncate(robot.description) }}
                </p>
              </div>
            </el-card>
          </div>
        </div>
        <div class="robot-group">
          <h3>图片生成机器人</h3>
          <div class="robot-cards">
            <el-card
              v-for="robot in imageRobots"
              :key="robot.id"
              class="robot-card"
            >
              <img :src="robot.icon" alt="icon" class="robot-icon" />
              <div class="robot-info">
                <p class="robot-name">{{ robot.name }}</p>
                <p class="robot-description">
                  {{ truncate(robot.description) }}
                </p>
              </div>
            </el-card>
          </div>
        </div>
        <div class="robot-group">
          <h3>音视频机器人</h3>
          <div class="robot-cards">
            <el-card
              v-for="robot in avRobots"
              :key="robot.id"
              class="robot-card"
            >
              <img :src="robot.icon" alt="icon" class="robot-icon" />
              <div class="robot-info">
                <p class="robot-name">{{ robot.name }}</p>
                <p class="robot-description">
                  {{ truncate(robot.description) }}
                </p>
              </div>
            </el-card>
          </div>
        </div>
      </div>
      <el-link class="view-all" @click="viewAllRobots">查看全部</el-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'assistant', // 默认选项卡
      userInput: '', // 用户输入内容
      textRobots: [
        {
          id: 1,
          name: '文本助手1',
          icon: '@/assets/icons/text1.png',
          description: '适合快速文本处理的机器人',
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
      ],
      imageRobots: [
        {
          id: 1,
          name: '图像生成1',
          icon: '@/assets/icons/image1.png',
          description: '支持多种风格的图片生成',
        },
      ],
      avRobots: [
        {
          id: 1,
          name: '音视频助手',
          icon: '@/assets/icons/av1.png',
          description: '快速编辑音视频的智能工具',
        },
      ],
    };
  },
  methods: {
    truncate(text, length = 20) {
      return text.length > length ? text.slice(0, length) + '...' : text;
    },
    viewAllRobots() {
      this.$router.push('/all-robots'); // 跳转到“查看全部”页面
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

  .chat-section {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;

    .chat-tabs {
      width: 100%;
    }

    .chat-input {
      width: 100%;
      margin-top: 10px;
    }
  }

  .robot-section {
    width: 100%;

    .section-title {
      font-size: 1.5rem;
      margin-bottom: 20px;
      text-align: center;
    }

    .robot-groups {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .robot-group {
        .robot-cards {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;

          .robot-card {
            width: 200px;
            height: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;

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
        }
      }
    }

    .view-all {
      display: block;
      text-align: right;
      margin-top: 10px;
    }
  }
}
</style>
