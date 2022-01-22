import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 组件样式收vuepress主题样式影响，重置这些样式
import "./style.css";
import VRender from '../../packages/index.js'
import CustomInput from "../../src/components/CustomInput.vue";
export default ({
  Vue
}) => {
  Vue.use(ElementUI, {
    size: "small",
  });
  Vue.use(VRender, {
    "custom-input": {
      component: CustomInput,
      handler(options) {
        if (options.defaultValue === "") {
          options.defaultValue = 0;
        }
      },
    },
  });
}