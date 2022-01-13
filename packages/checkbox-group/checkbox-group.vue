<template>
  <el-checkbox-group v-bind="attrs" v-on="listeners">
    <el-checkbox
      v-for="option in options"
      :key="option.key"
      :label="option.value"
    >
      {{ option.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>
<script>
export default {
  name: "checkbox-group",
  inheritAttrs: false,
  props: {
    value: Array,
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
