import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
   {
      path: '/',
      name: 'Home',
      component: Home,
   },
   {
      path: '/categories',
      name: 'Categories',
      component: () => import('../views/Categories.vue'),
   },
   {
      path: '/random',
      name: 'Random',
      component: () => import('../views/Randomizer.vue'),
   },
   {
      path: '/details/:id',
      name: 'Details',
      component: () => import('../views/Details.vue'),
   },
   {
      path: '*',
      component: () => import('../views/NotFound.vue'),
   },
];

const router = new VueRouter({
   routes,
});

export default router;
