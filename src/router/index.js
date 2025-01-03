// src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layouts/defaultLayout.vue';
import Home from '@/views/HomePage.vue';
import About from '@/views/AboutPage.vue';
import Setting from '@/views/UserSettingPage.vue';
import PersonalHome from '@/views/PersonalHomePage.vue';
import Test from '@/views/TestPage.vue';
import ChatRobot from '@/views/ChatRobotPage.vue';
import SubscribedBots from '@/views/SubscribedBotsPage.vue';
import DeveloperCenter from '@/views/DeveloperCenterPage.vue';
import Rgister from '@/views/RegisterPage.vue';
import RobotDetail from '@/views/RobotDetailPage.vue';
import Explorer from '@/views/ExplorerPage.vue';
import CreateBots from '@/views/CreateBotsPage.vue';
import HelperCenter from '@/views/HelperCenterPage.vue';
import ConversationHistory from '@/views/ConversationHistory.vue';
//import { component } from 'vue/types/umd';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          title: 'RazorAI-首页', // 首页标题
        },
      },
      {
        path: 'subscribedBots',
        name: 'SubscribedBots',
        component: SubscribedBots,
        meta: {
          title: 'RazorAI-已订阅的机器人', // 已订阅的机器人页标题
        },
      },
      {
        path: '/developerCenter',
        name: 'DeveloperCenter',
        component: DeveloperCenter,
        meta: {
          title: 'RazorAI-开发者中心', // 开发者中心页标题
        },
      },
      {
        path: '/createRobot',
        name: 'CreateBots',
        component: CreateBots,
        meta: {
          title: 'RazorAI-创建机器人', // 创建机器人页标题
        },
      },
      {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
          title: 'RazorAI-关于我们', // 关于页面标题
        },
      },
      {
        path: '/setting',
        name: 'Setting',
        component: Setting,
        meta: {
          title: 'RazorAI-系统设置', // 系统设置页面标题
        },
      },
      {
        path: '/personalhome',
        name: 'PersonalHome',
        component: PersonalHome,
        meta: {
          title: 'RazorAI-个人主页', // 个人主页标题
        },
      },
      {
        path: '/test',
        name: 'Test',
        component: Test,
        meta: {
          title: 'RazorAI-测试页面', // 测试页面标题
        },
      },
      {
        path: '/chatRobot/:id',
        name: 'ChatRobot',
        component: ChatRobot,
        meta: {
          title: 'RazorAI-聊天',
        },
      },
      {
        path: 'register',
        name: 'Register',
        component: Rgister,
        meta: {
          title: 'RazorAI-注册',
        },
      },
      {
        path: '/robot/:id',
        name: 'RobotDetail',
        component: RobotDetail,
        meta: {
          title: 'RazorAI-机器人详情',
        },
      },
      {
        path: '/explorer',
        name: 'Explorer',
        component: Explorer,
        meta: {
          title: 'RazorAI-探索',
        },
      },
      {
        path: '/helperCenter',
        name: 'HelperCenter',
        component: HelperCenter,
        meta: {
          title: 'RazorAI-帮助中心',
        },
      },
      {
        path: '/conversationHistory/:id',
        name: 'ConversationHistory',
        component: ConversationHistory,
        meta: {
          title: 'RazorAI-对话历史',
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // 如果路由有定义 meta.title 就使用它作为页面标题
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'RazorAI'; // 这里可以设置一个默认的标题
  }
  next(); // 继续导航
});

export default router;
