import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/form/base",
    name: "Base",
    component: () =>
      import(/* webpackChunkName: "base" */ "../../examples/form/Base.vue"),
  },
  {
    path: "/form/status",
    name: "Status",
    component: () =>
      import(/* webpackChunkName: "base" */ "../../examples/form/Status.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
