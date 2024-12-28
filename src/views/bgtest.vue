<template>
  <div class="homepage">
    <!-- 动画容器 -->
    <div class="animation-container">
      <div class="background">
        <div class="glow"></div>
        <div class="grid-lines"></div>
      </div>
      <!-- logo和名字 -->
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="Razor AI" />
        <h1>Razor AI</h1>
      </div>
    </div>
  </div>
</template>

<script>
// mport axios from 'axios';
// import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: {
    // InfiniteLoading,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.homepage {
  max-width: 100%;
  height: 100%;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 垂直居中 */

  .animation-container {
    position: relative; /* 相对定位 */
    width: 100%; /* 动画容器的宽度，可根据需求调整 */
    height: 100%; /* 动画容器的高度，可根据需求调整 */
    overflow: hidden; /* 确保动画不会超出容器边界 */
    display: flex; /* flex布局 */
    align-items: center; /* 水平居中 */
    justify-content: center; /* 垂直居中 */

    .background {
      position: absolute; /* 绝对定位 */
      width: 100%; /* 填满父容器 */
      height: 100%; /* 填满父容器 */
      z-index: -1; /* 确保背景在最底层 */
      background: $background-color; /* 背景颜色 */

      .glow {
        position: absolute; /* 绝对定位 */
        top: 50%; /* 垂直居中 */
        left: 50%; /* 水平居中 */
        width: 200%; /* 发光效果的大小 */
        height: 200%;
        background: radial-gradient(
          circle,
          rgba($secondary-color, 0.1),
          rgba($secondary-color, 0.4),
          transparent
        );
        transform: translate(-50%, -50%);
        animation: pulse 4s infinite;
      }

      .grid-lines {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(
            to right,
            rgba($border-color, 0.1) 2px,
            transparent 1px
          ),
          linear-gradient(
            to bottom,
            rgba($border-color, 0.1) 2px,
            transparent 1px
          );
        background-size: 20px 20px;
        mix-blend-mode: overlay;
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 0.5;
          transform: translate(-50%, -50%) scale(1);
        }
        50% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.2);
        }
      }
    }
  }
}
</style>
