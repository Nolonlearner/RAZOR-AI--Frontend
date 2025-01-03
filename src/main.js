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

// 初始化应用程序
async function initApp() {
  try {
    // 检查 Vuex 中 haveSubscribed 的状态并初始化
    if (
      !store.state.agent.haveSubscribed ||
      store.state.agent.haveSubscribed.length === 0
    ) {
      const userId = store.state.user.userId;
      if (userId) {
        await store.dispatch('agent/fetchUserSubscriptions', userId);
        console.log('初始化用户订阅机器人信息成功');
      } else {
        console.warn('用户 ID 不存在，无法初始化');
      }
    }
    if (
      store.state.agent.textAgents.length === 0 ||
      store.state.agent.imageAgents.length === 0 ||
      store.state.agent.videoAgents.length === 0
    ) {
      await store.dispatch('agent/fetchAllAgentsData');
      console.log('初始化所有AI 机器人信息成功');
    }
    if (store.state.chat.chats.length === 0 || store.state.user.userId) {
      const userId = store.state.user.userId;
      if (userId) {
        // 把userId转化为json格式
        const jsonUserId = {
          user_id: userId,
        };
        await store.dispatch('chat/fetchChats', jsonUserId);
        console.log('初始化所有chat信息成功', store.state.chat.chats);
      } else {
        console.warn('用户 ID 不存在，无法初始化');
      }
    }
  } catch (error) {
    console.error('初始化应用程序失败:', error);
  }
}
// 等待初始化完成后挂载 Vue 实例
initApp()
  .then(() => {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  })
  .catch((error) => {
    console.error('应用初始化失败，无法启动:', error);
  });
