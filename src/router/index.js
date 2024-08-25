// src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layouts/defaultLayout.vue';
import Home from '@/views/HomePage.vue';
import ProductDetail from '@/views/ProductDetail.vue';
import About from '@/views/AboutPage.vue';
import Setting from '@/views/UserSettingPage.vue';
import PersonalHome from '@/views/PersonalHomePage.vue';
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
      },
      {
        path: '/product/:id',
        name: 'ProductDetail',
        component: ProductDetail,
      },
      {
        path: '/about',
        name: 'About',
        component: About,
      },
      {
        path: '/setting',
        name: 'Setting',
        component: Setting,
      },
      {
        path: '/personalhome',
        name: 'PersonalHome',
        component: PersonalHome,
      },
      {
        path: '/test',
        name: 'Test',
        component: Test,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
