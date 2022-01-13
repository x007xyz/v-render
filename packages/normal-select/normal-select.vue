<template>
  <el-select :value="value" v-bind="attrs" v-on="listeners">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      v-bind="getProps(item)"
    >
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: "normal-select",
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
