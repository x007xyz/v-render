import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // 默认主题
import RenderForm from "@v-render/render-form";

Vue.config.productionTip = false;

Vue.use(ElementUI, {
  size: "small",
});

Vue.component("RenderForm", RenderForm);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
