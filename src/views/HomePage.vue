<!-- filepath: /d:/MyGitHub/razor-ai-frontend/src/views/HomePage.vue -->
<template>
  <div class="homepage">
    <!-- 背景动画 -->
    <div class="background">
      <div class="glow"></div>
      <div class="grid-lines"></div>
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

// 背景动画
.background {
  // 固定背景位置，使其始终位于页面顶部和左侧
  position: fixed; // fixed通俗的理解就是固定定位，它是相对于浏览器窗口进行定位的，当页面滚动时，元素不会随着滚动条滚动，它会始终保持在一个位置。
  top: 0;
  left: 0;
  // 设置背景的宽度和高度为视口的100%
  width: 100%;
  height: 100%;
  // 设置z-index为-1，确保背景位于页面内容的下方
  z-index: -1;
  // 设置背景颜色为深灰色
  background: #0d0d0d;

  .glow {
    // 绝对定位，相对于.background容器进行定位
    position: absolute; // absolute通俗的理解就是绝对定位，它是相对于最近的已定位的父级元素进行定位的，如果没有已定位的父级元素，那么它是相对于html元素进行定位的。
    top: 50%;
    left: 50%;
    // 设置发光效果的宽度和高度为100%，覆盖整个.background容器
    width: 100%;
    height: 100%;
    // 使用径向渐变创建发光效果，从半透明的青色到透明
    // radial-gradient() 函数用于创建一个径向渐变的背景图像。
    // circle: 创建一个圆形的径向渐变。
    // rgba(0, 255, 255, 0.3): 青色，透明度为0.3
    // transparent: 完全透明
    background: radial-gradient(circle, rgba(0, 255, 255, 0.3), transparent);
    // 使用transform属性将元素中心移动到.background的中心
    transform: translate(-50%, -50%);
    // 应用动画pulse，持续时间为6秒，无限循环
    animation: pulse 6s infinite;
  }

  .grid-lines {
    // 绝对定位，相对于.background容器进行定位
    position: absolute;
    width: 100%;
    height: 100%;
    // 使用线性渐变创建垂直和水平的网格线
    background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.1) 1px,
        transparent 1px
      ),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    // 设置背景图案的大小为20px x 20px
    background-size: 20px 20px;
    // 使用mix-blend-mode属性将网格线与背景混合，创建叠加效果
    mix-blend-mode: overlay;
  }

  // 定义pulse动画
  @keyframes pulse {
    0%,
    100% {
      // 在动画开始和结束时，设置透明度为0.5，并且元素大小不变
      opacity: 0.5;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      // 在动画中间时刻，设置透明度为1，并且元素放大到1.2倍
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
}
</style>
