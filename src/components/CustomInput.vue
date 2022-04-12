<template>
  <el-input :value="showValue" v-bind="attrs" v-on="listeners"></el-input>
</template>
<script>
export default {
  name: "CustomInput",
  props: {
    value: [String, Number],
  },
  data() {
    return {};
  },
  computed: {
    showValue() {
      return (this.value / 100).toFixed();
    },
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
      console.log(value, this.$attrs);
      this.$emit("input", value * 100);
    },
  },
};
</script>
<style lang="css" scoped></style>
