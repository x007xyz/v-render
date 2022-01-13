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
    component: () => import("../../examples/form/Base.vue"),
  },
  {
    path: "/form/status",
    name: "Status",
    component: () => import("../../examples/form/Status.vue"),
  },
  {
    path: "/form/rules",
    name: "Rules",
    component: () => import("../../examples/form/Rules.vue"),
  },
  {
    path: "/form/config",
    name: "Config",
    component: () => import("../../examples/form/Config.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
