<template>
  <el-date-picker v-bind="attrs" v-on="listeners"> </el-date-picker>
</template>
<script>
export default {
  name: "date-picker",
  inheritAttrs: false,
  props: {
    value: [Array, Date, String],
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
