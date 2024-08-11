<!-- src/views/HomePage.vue -->
<template>
  <div class="home">
    <AppHeader />
    <h1>Hiiiiiiii! Welcome to RAZOR-AIIiIIIIII!!!</h1>
    <img src="@/assets/images/logo.png" alt="test logo" />
    <p>test test</p>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'Home',
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style scoped>
/* Home 页面样式 */
</style>
