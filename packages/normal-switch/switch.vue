<template>
  <el-switch v-bind="attrs" v-on="listeners"> </el-switch>
</template>
<script>
export default {
  name: "switch",
  inheritAttrs: false,
  props: {
    value: [Boolean, Number, String],
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
