import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VRender from '../../packages/index.js'
export default ({
  Vue
}) => {
  Vue.use(ElementUI, {
    size: "small",
  });
  Vue.use(VRender)
}