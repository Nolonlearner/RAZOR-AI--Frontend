<!-- src/views/TestPage.vue -->
<template>
  <div>
    <h1>测试</h1>
    <p>这是测试页面。用以开发测试</p>
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
        .get('http://101.37.88.111:5000/test') ///user/login    user_name user_password
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
/* TestPage 页面样式 */
pre {
  text-align: left;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
