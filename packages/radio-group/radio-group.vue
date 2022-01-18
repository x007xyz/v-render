<template>
  <el-radio-group v-bind="attrs" v-on="listeners">
    <el-radio
      v-for="option in options"
      :key="option.key"
      :label="option.value"
      v-bind="getProps(option)"
    >
      {{ option.label }}
    </el-radio>
  </el-radio-group>
</template>
<script>
export default {
  name: "radio-group",
  inheritAttrs: false,
  props: {
    value: [String, Number, Boolean],
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
    getProps(data) {
      //eslint-disable-next-line
      const { value, label, ...props } = data;
      return props;
    },
    onInput(value) {
      this.$emit("input", value);
    },
  },
};
</script>
<style lang="css" scoped></style>
