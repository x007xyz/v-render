import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 组件样式收vuepress主题样式影响，重置这些样式
import "./style.css";
import VRender from '../../packages/index.js'
export default ({
  Vue
}) => {
  Vue.use(ElementUI, {
    size: "small",
  });
  Vue.use(VRender)
}