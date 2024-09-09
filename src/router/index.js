// src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layouts/defaultLayout.vue';
import Home from '@/views/HomePage.vue';
import ProductDetail from '@/views/ProductDetail.vue';
import About from '@/views/AboutPage.vue';
import Setting from '@/views/UserSettingPage.vue';
import PersonalHome from '@/views/PersonalHomePage.vue';
import Login from '@/views/LoginPage.vue';
import Test from '@/views/TestPage.vue';

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
          title: 'ROZAR-AI-首页', // 首页标题
        },
      },
      {
        path: '/product/:id',
        name: 'ProductDetail',
        component: ProductDetail,
        meta: {
          title: 'ROZAR-AI-产品详情', // 产品详情页标题
        },
      },
      {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
          title: 'ROZAR-AI-关于我们', // 关于页面标题
        },
      },
      {
        path: '/setting',
        name: 'Setting',
        component: Setting,
        meta: {
          title: 'ROZAR-AI-用户设置', // 用户设置页面标题
        },
      },
      {
        path: '/personalhome',
        name: 'PersonalHome',
        component: PersonalHome,
        meta: {
          title: 'ROZAR-AI-个人主页', // 个人主页标题
        },
      },
      {
        path: '/test',
        name: 'Test',
        component: Test,
        meta: {
          title: 'ROZAR-AI-测试页面', // 测试页面标题
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'ROZAR-AI-登录', // 登录页面标题
    },
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
    document.title = 'ROZAR-AI'; // 这里可以设置一个默认的标题
  }
  next();
});

export default router;
