<template>
  <div class="list-simple">
    <div class="title">{{ title }}</div>
    <div class="list-item" v-for="(item, index) in value" :key="index">
      <div class="list-item-form">
        <slot :index="index"></slot>
      </div>
      <div class="handle">
        <el-button
          type="text"
          :disabled="index === 0"
          @click="onMove(index, -1)"
          >上移</el-button
        >
        <el-divider direction="vertical"></el-divider>
        <el-button
          type="text"
          :disabled="index === value.length - 1"
          @click="onMove(index, 1)"
        >
          下移
        </el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" @click="onRemove(index)">删除</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" @click="onCopy(index)">复制</el-button>
      </div>
    </div>
    <div class="btn-new" @click="onNew">
      <i class="el-icon-plus"></i>
      新增一条
    </div>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {};
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    title: String,
  },
  methods: {
    onRemove(index) {
      this.$emit("remove", index);
    },
    onCopy(index) {
      this.$emit("copy", index);
    },
    onMove(index, step) {
      this.$emit("move", { index, step });
    },
    onNew() {
      this.$emit("add");
    },
  },
};
</script>
<style lang="css" scoped>
.list-simple {
  float: left;
  width: 100%;
  /* overflow: hidden; */
}
.list-item {
  overflow: hidden;
  display: flex;
}
.list-item-form {
  flex: 1;
}
.btn-new {
  font-size: 16px;
  border: 1px dashed #999;
  overflow: hidden;
  width: 100%;
  text-align: center;
  padding: 4px 0;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
    color: #409eff;
    border-color: #409eff;
  }
}
.list-simple {
  border-radius: 4px;
  border: 1px solid #f4f4f4;
  margin-bottom: 24px !important;
  padding: 24px;
  overflow: hidden;
  box-sizing: border-box;
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
