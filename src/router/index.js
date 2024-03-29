import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/form/test",
    name: "Test",
    component: () => import("../../examples/form/Test.vue"),
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
    path: "/form/watcher",
    name: "Watcher",
    component: () => import("../../examples/form/Watcher.vue"),
  },
  {
    path: "/comp/date",
    name: "Date",
    component: () => import("../../examples/components/Date.vue"),
  },
  {
    path: "/comp/time",
    name: "Time",
    component: () => import("../../examples/components/Time.vue"),
  },
  {
    path: "/comp/input",
    name: "Input",
    component: () => import("../../examples/components/Input.vue"),
  },
  {
    path: "/comp/switch",
    name: "Switch",
    component: () => import("../../examples/components/Switch.vue"),
  },
  {
    path: "/comp/radio",
    name: "Radio",
    component: () => import("../../examples/components/Radio.vue"),
  },
  {
    path: "/comp/checkbox",
    name: "Radio",
    component: () => import("../../examples/components/Checkbox.vue"),
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
    path: "/comp/table",
    name: "cTable",
    component: () => import("../../examples/components/Table.vue"),
  },
  {
    path: "/comp/custom",
    name: "custom",
    component: () => import("../../examples/components/Custom.vue"),
  },
  {
    path: "/table/index",
    name: "Table",
    component: () => import("../../examples/table/index.vue"),
  },
  {
    path: "/generator/index",
    name: "generator",
    component: () => import("../../examples/generator/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
