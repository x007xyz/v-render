<template>
  <div id="app">
    <router-link to="/">首页</router-link>
    -
    <router-link to="/form/base">典型表单</router-link>
    -
    <router-link to="/form/status">表单状态</router-link>
    -
    <router-link to="/form/layout">表单布局</router-link>
    -
    <router-link to="/form/rules">表单校验</router-link>
    -
    <router-link to="/form/config">配置项</router-link>
    <router-view></router-view>
  </div>
</template>
