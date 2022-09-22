<template>
  <el-time-picker v-bind="attrs" v-on="listeners"> </el-time-picker>
</template>
<script>
export default {
  name: "time-picker",
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
        "is-range": this.$attrs.type === "timerange",
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
