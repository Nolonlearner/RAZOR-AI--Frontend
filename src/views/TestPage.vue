<template>
  <div class="test-page">
    <div class="animated-background"></div>
    <h1 class="title">测试</h1>
    <p class="description">这是测试页面。用以开发测试</p>
    <button class="primary-button" @click="fetchData">获取数据</button>
    <pre v-if="data">{{ data }}</pre>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Test',
  data() {
    return {
      data: null,
    };
  },
  methods: {
    fetchData() {
      axios
        .get('http://101.37.88.111:5000/test')
        .then((response) => {
          this.data = JSON.stringify(response.data, null, 2);
        })
        .catch((error) => {
          this.data = 'Error: ' + error.message;
        });
    },
  },
};
</script>

<style scoped>
.test-page {
  position: relative;
  padding: 20px;
  color: #ffffff; /* 白色文字 */
  height: 100vh; /* 满屏高度 */
  overflow: hidden; /* 隐藏溢出内容 */
}

.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    270deg,
    #105615,
    #527e67,
    #0fcd97,
    #e7f1f4
  ); /* 渐变色 */
  background-size: 400% 400%;
  animation: gradientAnimation 20s ease infinite; /* 动画效果 */
  z-index: -1; /* 背景层级在后 */
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.title {
  font-size: 3em;
  margin-bottom: 20px;
  animation: fadeIn 3s ease; /* 进入动画 */
  color: #000; /* 黑色文字 */
}

.description {
  font-size: 1.5em;
  margin-bottom: 30px;
  animation: fadeIn 1.5s ease; /* 进入动画 */
}

.primary-button {
  padding: 10px 20px;
  background-color: #1e90ff;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.primary-button:hover {
  background-color: #00bfff; /* 悬停效果 */
}

pre {
  text-align: left;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  color: #000; /* 黑色文字 */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
