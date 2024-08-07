// src/main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入全局样式
/**
 * 使用 import './assets/styles/global.css'; 语句时，Webpack（或其他打包工具）会解析
 * 这个路径并将 CSS 文件的内容包含到最终的打包文件中。这使得这些样式在浏览器加载应用时自动应用。
 * CSS 文件的导入不需要变量名，因为其内容会自动应用到全局。
 * 为了实现组件级别的样式隔离，可以使用 <style scoped> 或 CSS Modules。
 */
import './assets/styles/global.css';
import './assets/styles/buttons.css';
import './assets/styles/forms.css';
import './assets/styles/layout.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
