<template>
  <div class="about-page">
    <h1 class="title">关于我们</h1>
    <p class="intro">这是关于我们页面。将要介绍一些初创团队的信息。</p>

    <div class="team-section">
      <h2 class="section-title">我们的开发团队（仅以字母顺序）</h2>
      <div class="team-list">
        <span class="team-member">侯九瑞</span>
        <span class="team-member">何如麟</span>
        <span class="team-member">林楠烽</span>
        <span class="team-member">吴忱</span>
        <span class="team-member">叶济豪</span>
        <span class="team-member">鄢祺昊</span>
        <span class="team-member">郑剡扬</span>
      </div>
    </div>

    <div class="platform-section">
      <h2 class="section-title">关于我们的平台</h2>
      <p>RAZOR-AI 可能是一个平台，但是RAZOR-AI是一个平台不太可能</p>
    </div>

    <div class="contact-section">
      <p>如果你有任何建议</p>
      <p>如果你想加入我们</p>
      <p>
        请联系我们：我们的联系方式:
        <a href="mailto:Razor-AI@outlook.com">Razor-AI@outlook.com</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins.scss' as *;
@use '@/assets/styles/variables.scss' as *;
.about-page {
  max-width: 100%; /* 填满整个宽度 */
  height: 100%; /* 填满整个高度 */
  margin: 0; /* 无边距 */
  background-color: $background-color;
  color: $text-color;
  display: flex;
  flex-direction: column; /* 纵向排列 */
  align-items: center; /* 内容居中 */
}

.title {
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 10px;
}

.intro {
  text-align: center;
  color: #aaa; /* 灰色文字 */
  margin-bottom: 20px;
}

.team-section,
.platform-section,
.contact-section {
  margin-bottom: 30px; /* 板块间隔 */
  text-align: center; /* 内容居中 */
  @include fadeIn(0.5s); // 设置动画持续时间为 0.5 秒
}

.section-title {
  font-size: 2em; /* 标题字号 */
  margin-bottom: 10px;
}

.team-list {
  display: flex; /* 横向排列 */
  justify-content: center; /* 居中对齐 */
  flex-wrap: wrap; /* 自动换行 */
}

.team-member {
  margin: 0 15px; /* 左右间距 */
  padding: 10px;
  border-radius: 5px; /* 圆角 */
  cursor: pointer; // 设置鼠标样式为手型
}

.team-member:hover {
  background-color: $hover-background-color; /* 悬停背景色 */
  transform: scale(1.05); /* 鼠标悬停时放大 */
}
</style>
