<template>
  <div class="card">
    <div class="title">{{ title }}</div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {};
  },
  props: {
    title: String,
  },
};
</script>
<style lang="css" scoped>
.card {
  border-radius: 4px;
  border: 1px solid #f4f4f4;
  margin-bottom: 24px !important;
  padding: 24px;
  overflow: hidden;
}
.title {
  font-size: 18px;
  font-weight: 600;
  margin: 16px 0;
  &::before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 18px;
    background-color: #409eff;
    margin-right: 8px;
    transform: translateY(2px);
  }
}
</style>
