import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // 默认主题
import RenderForm from "../packages/render-form";

Vue.config.productionTip = false;

Vue.use(ElementUI, {
  size: "small",
});

Vue.component("RenderForm", RenderForm);

// Vue.use(VRender, {
//   "custom-input": {
//     component: CustomInput,
//     handler(options) {
//       if (options.defaultValue === "") {
//         options.defaultValue = 0;
//       }
//     },
//   },
// });

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
