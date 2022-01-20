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
    path: "/form/layout",
    name: "Layout",
    component: () => import("../../examples/form/Layout.vue"),
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
  {
    path: "/comp/date",
    name: "Date",
    component: () => import("../../examples/components/Date.vue"),
  },
  {
    path: "/comp/dict",
    name: "Dict",
    component: () => import("../../examples/components/DictSelect.vue"),
  },
  {
    path: "/comp/search",
    name: "Search",
    component: () => import("../../examples/components/SearchSelect.vue"),
  },
  {
    path: "/comp/form",
    name: "Form",
    component: () => import("../../examples/components/ChildForm.vue"),
  },
  {
    path: "/comp/slot",
    name: "Slot",
    component: () => import("../../examples/components/SlotComp.vue"),
  },
  {
    path: "/table/index",
    name: "Table",
    component: () => import("../../examples/table/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
