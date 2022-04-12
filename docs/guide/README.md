# 介绍
v-render是基于`vue2.0`的中后台解决方案，支持通过json生成表单、详情、表格，内置封装大量常用组件和基本功能，开箱即用，同时也支持自定义扩展，还提供可视化编辑器快速生成页面。
# 安装
`v-render`依赖`element-ui`，需要先引入`element-ui`
```js
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // 默认主题
import VRender from "v-render2";

Vue.use(ElementUI);

Vue.use(VRender);

```