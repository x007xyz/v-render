# 介绍
v-render是基于`vue2.0`的中后台解决方案，支持通过json生成表单、详情、表格，内置封装大量常用组件和基本功能，开箱即用，同时也支持自定义扩展，还提供可视化编辑器快速生成页面。
## 安装

## 使用

:::demo 此处放置代码示例的描述信息，支持 `Markdown` 语法，**描述信息只支持单行**
```html
<template>
  <div class="red-center-text">
      <p>{{ message }}</p>
      <input v-model="message" placeholder="Input something..."/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: 'Hello Vue'
    }
  }
}
</script>
<style>
.red-center-text { 
  color: #ff7875;
  text-align: center;
}
</style>
```
:::