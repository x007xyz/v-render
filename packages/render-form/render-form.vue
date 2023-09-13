<template>
  <el-form
    ref="form"
    :model="formData"
    :hide-required-asterisk="textModel"
    :label-width="labelWidth || rootSchema.labelWidth"
    :label-position="labelPosition || rootSchema.labelPosition"
  >
    <VRow :list="rootSchema.properties" :group="{ name: 'g1' }">
      <Field
        v-for="item in rootSchema.properties"
        :key="item.key"
        :path="item.key"
        :schema="item"
      ></Field>
    </VRow>
  </el-form>
</template>

<script>
import { get, set } from "lodash-es";
import Field from "./render-field";

import { createDataSkeleton } from "../../core/genData4Schema";
import { flattenSchema } from "../../core/flattenSchema";
import translateSchema from "../../core/translateSchema";
import VRow from "./v-row.vue";

export default {
  name: "render-form",
  components: {
    Field,
    VRow,
  },
  provide() {
    return {
      root: this,
    };
  },
  props: {
    widgets: {
      type: Object,
      default() {
        return {};
      },
    },
    watch: {
      type: Object,
      default() {
        return {};
      },
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    // 左右模式或者上下模式。top 为上下，left/right 为左右（指左右时，label 是左对齐或右对齐）
    labelPosition: {
      type: String,
      default: "top",
    },
    // 左右模式时，label 的宽度
    labelWidth: {
      type: String,
      default: "160px",
    },
    schema: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      formData: {},
      rootSchema: {},
      flattenSchema: {},
    };
  },
  watch: {
    schema: {
      handler(val) {
        this.setSchema(val);
      },
      immediate: true,
    },
    watch: {
      handler(val) {
        Object.keys(val).forEach((key) => {
          const path = key.replace("#", "");
          if (typeof val[key] === "function") {
            this.$watch(
              () => (path ? get(this.formData, path) : this.formData),
              val[key]
            );
            return;
          }
          const { handler, ...options } = val[key];
          this.$watch(
            () => (path ? get(this.formData, path) : this.formData),
            handler,
            options
          );
        });
      },
      immediate: true,
    },
  },
  computed: {
    fieldMaxWidth() {
      return this.rootSchema.maxWidth || "80%";
    },
  },
  methods: {
    setSchema(schema) {
      this.rootSchema = translateSchema(schema);
      // 根据schema初始化formData，mode为update时，更新formData，否则重置formData
      // this.genFormDataBySchema(schema, mode);
      this.flattenSchema = flattenSchema(schema);
      this.formData = createDataSkeleton(this.rootSchema, this.formData);
    },
    getValues() {
      return this.formData;
    },
    getValueByPath(path) {
      return get(this.formData, path);
    },
    setValueByPath(value, path) {
      set(this.formData, path, value);
    },
  },
  created() {},
};
</script>

<style scoped lang="scss">
@import "./style.scss";
.flex-box {
  display: flex;
  flex-wrap: wrap;
  padding: 24px;
}
</style>
