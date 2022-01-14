import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import RenderForm from '../../packages/render-form'
export default ({
  Vue
}) => {
  Vue.use(ElementUI, {
    size: "small",
  });
  Vue.component('RenderForm', RenderForm)
}