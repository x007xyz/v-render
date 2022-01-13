<template>
  <el-radio-group v-bind="attrs" v-on="listeners">
    <el-radio v-for="option in options" :key="option.key" :label="option.value">
      {{ option.label }}
    </el-radio>
  </el-radio-group>
</template>
<script>
export default {
  name: "radio-group",
  inheritAttrs: false,
  props: {
    value: [String, Number],
    options: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    attrs() {
      return {
        ...this.$attrs,
        value: this.value,
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
