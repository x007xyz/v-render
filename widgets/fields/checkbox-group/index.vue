<template>
  <el-checkbox-group v-bind="attrs" v-on="listeners">
    <el-checkbox
      v-for="option in options"
      :key="option.key"
      :label="option.value"
      v-bind="getProps(option)"
    >
      <RenderItem
        v-if="option.render"
        :render="option.render"
        :scope="option"
      ></RenderItem>
      <template v-else>
        {{ option.label }}
      </template>
    </el-checkbox>
  </el-checkbox-group>
</template>
<script>
export default {
  name: "checkbox-group",
  components: {
    RenderItem: () => import("../../../packages/render-item/render-item.vue"),
  },
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
  beforeMount() {
    console.log("checkbox-group beforeMount");
  },
  beforeUpdate() {
    console.log("checkbox-group beforeUpdate");
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
