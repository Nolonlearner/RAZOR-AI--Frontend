<!-- src/components/AppHeader.vue -->
<template>
  <header class="header">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style scoped>
/* 添加组件的样式 */
.header {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
}

.header nav ul {
  list-style: none;
  display: flex;
}

.header nav ul li {
  margin-right: 20px;
}
</style>
