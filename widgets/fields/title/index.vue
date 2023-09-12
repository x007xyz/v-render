<template>
  <div class="title">{{ title }}</div>
</template>
<script>
export default {
  name: "index",
  props: {
    title: String,
  },
  data() {
    return {};
  },
};
</script>
<style lang="css" scoped>
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
