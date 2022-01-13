<template>
  <el-input :value="value" v-bind="attrs" v-on="listeners">
    <RenderItem slot="prepend" v-if="prefix" :render="prefix"></RenderItem>
    <RenderItem slot="append" v-if="suffix" :render="suffix"></RenderItem>
  </el-input>
</template>
<script>
import RenderItem from "../render-item/render-item.vue";
/**
 * prefix: 默认为空，String、Function类型，前置符号
 * suffix: 默认为空，String、Function类型，后置符号
 */
export default {
  name: "number-input",
  components: { RenderItem },
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
    },
    prefix: [String, Function],
    suffix: [String, Function],
  },
  computed: {
    attrs() {
      return {
        ...this.$attrs,
      };
    },
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
      };
    },
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    },
  },
};
</script>
<style lang="css" scoped></style>
