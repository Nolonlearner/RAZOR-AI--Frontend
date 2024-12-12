// src/main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入全局样式
/*
import '@/assets/styles/variables.scss';
import '@/assets/styles/mixins.scss';
import '@/assets/styles/forms.scss';
import '@/assets/styles/utilities.scss';
import '@/assets/styles/buttons.scss';
import '@/assets/styles/layout.scss';
*/
import '@/assets/styles/global.scss';
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
