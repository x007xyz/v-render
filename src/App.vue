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
    -
    <router-link to="/comp/date">日期组件</router-link>
    -
    <router-link to="/comp/dict">字典下拉</router-link>
    -
    <router-link to="/comp/search">搜索下拉</router-link>
    -
    <router-link to="/comp/form">子表单</router-link>
    -
    <router-link to="/comp/slot">slot</router-link>
    -
    <router-link to="/comp/table">表格选择器</router-link>
    -
    <router-link to="/table/index">表格</router-link>
    <router-view></router-view>
  </div>
</template>
