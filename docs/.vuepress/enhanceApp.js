import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 组件样式收vuepress主题样式影响，重置这些样式
import "./style.css";
export default ({
  Vue
}) => {
  Vue.use(ElementUI, {
    size: "small",
  });
  Vue.mixin({
    mounted() {
      import('../../packages/index.js').then(function (VRender) {
        import('../../src/components/CustomInput.vue').then(CustomInput => { 
          Vue.use(VRender.default, {
            "custom-input": {
              component: CustomInput.default,
              handler(options) {
                if (options.defaultValue === "") {
                  options.defaultValue = 0;
                }
              },
            },
          });
        })
      });
    },
  });
}