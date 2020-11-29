import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import("../views/Categories.vue")
  },
  {
    path: "/randomizer",
    name: "Randomizer",
    component: () => import("../views/Randomizer.vue")
  },
  {
    path: "/details/:id",
    name: "Details",
    component: () => import("../views/Details.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;