import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<any> = [
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
];

const router = new VueRouter({
   mode: 'history',
   routes,
});

export default router;
