// src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/HomePage.vue';
import About from '@/views/AboutPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
