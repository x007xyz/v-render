# render-form

## 安装
`v-render`依赖`element-ui`，需要先引入`element-ui`
```js
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // 默认主题
import VRender from "@v-render";

Vue.use(ElementUI);

Vue.use(VRender);

```

## 展示
使用`render-form`使用json我们就可以快速生成表单，`render-form`封装了大量的实用组件可以直接使用，而且还支持文本模式展示表单，在我们的日常业务中可以直接使用文本模式作为数据的详情页面，一套json就可以完成新增、编辑、详情页面。
:::demo
<<< @/examples/form/Status.vue
:::

