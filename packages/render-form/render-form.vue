<template>
  <el-form
    ref="form"
    :model="formData"
    :hide-required-asterisk="readonly"
    :label-width="_labelWidth"
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
    <!-- TODO: 将判断逻辑进行抽象 -->
    <el-form-item v-if="footer || $slots.footer">
      <template v-if="footer === true">
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </template>
      <template v-if="typeof footer === 'object'">
        <el-button @click="reset">{{ footer.reset.title }}</el-button>
        <el-button type="primary" @click="onSubmit">{{
          footer.submit.title
        }}</el-button>
      </template>
      <template v-if="typeof footer === 'function'">
        <RenderItem :render="footer"></RenderItem>
      </template>
      <slot name="footer"></slot>
    </el-form-item>
  </el-form>
</template>

<script>
import { get, set } from "lodash-es";
import Field from "./render-field";

import { createDataSkeleton } from "../../core/genData4Schema";
import { flattenSchema, getSchemaFromFlatten } from "../../core/flattenSchema";
import translateSchema from "../../core/translateSchema";
import VRow from "./v-row.vue";

import { Input, DatePicker, TimePicker, Switch, Slider } from "element-ui";
import Html from "../../widgets/fields/html";
import NumberInput from "../../widgets/fields/number-input";
import Select from "../../widgets/fields/select";
import Radio from "../../widgets/fields/radio-group";
import Checkbox from "../../widgets/fields/checkbox-group";
import Title from "../../widgets/fields/title";
import Card from "../../widgets/card";
import SimpleList from "../../widgets/simpleList";
import { _cloneDeep } from "../../core/utils";
import RenderItem from "../render-item/render-item.vue";

export default {
  name: "RenderForm",
  components: {
    Field,
    VRow,
    RenderItem,
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
        return {
          Input,
          Html,
          NumberInput,
          Select,
          Radio,
          Checkbox,
          DatePicker,
          TimePicker,
          Switch,
          Slider,
          Title,
          Card,
          SimpleList,
        };
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
      type: [String, Number],
      default: "80px",
    },
    schema: {
      type: Object,
      default() {
        return {};
      },
    },
    // 是否显示默认底部按钮
    footer: {
      type: [Boolean, Object, Function],
      default: false,
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
      // TODO: 处理watch监听数组的情况
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
    _labelWidth() {
      const _labelWidth = this.rootSchema.labelWidth || this.labelWidth;
      if (/^\d+$/.test(_labelWidth)) {
        return `${_labelWidth}px`;
      }
      return _labelWidth;
    },
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
      return _cloneDeep(this.formData);
    },
    setValues(data) {
      Object.keys(this.flattenSchema).forEach((key) => {
        if (key !== "#") {
          this.setValueByPath(get(data, key), key);
        }
      });
    },
    getValueByPath(path) {
      return get(this.formData, path);
    },
    setValueByPath(value, path) {
      set(this.formData, path, value);
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("submit", this.formData);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reset() {
      this.formData = createDataSkeleton(this.rootSchema);
    },
    _emitSelectField(path) {
      this.$emit("select-field", {
        path,
        schema: getSchemaFromFlatten(this.flattenSchema, path),
      });
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
