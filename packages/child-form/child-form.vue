<template>
  <div class="child-form-container">
    <el-form
      ref="form"
      :model="formData"
      :label-width="labelWidth"
      :label-position="labelPosition"
    >
      <div class="child-form" v-for="(data, index) in value" :key="index">
        <div class="child-form-head">
          <span>{{ headerLabel }}{{ index + 1 }}</span>
          <el-button type="text" @click="onDelete(index)">删除</el-button>
        </div>
        <div class="child-form-body">
          <RenderField
            v-for="(_, key) in fieldOption[index]"
            :key="key"
            :prop="`${index}.${key}`"
          >
          </RenderField>
        </div>
      </div>

      <div class="child-form-add-btn" @click="addChildForm">
        {{ addBtnLabel }}
      </div>
    </el-form>
  </div>
</template>

<script>
import { generateFormDate } from "../render-form/utils";
export default {
  name: "ChildForm",
  components: {
    RenderField: () => import("../render-form/core/render-field.vue"),
  },
  inject: ["mainForm"],
  props: {
    // 组件的key路径
    path: {
      type: String,
    },
    watcher: {
      type: Object,
      default() {
        return {};
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    labelWidth: {
      type: String,
      default: "130px",
    },
    labelPosition: {
      type: String,
      default: "top",
    },
    textModel: {
      type: Boolean,
      default: false,
    },
    addBtnLabel: {
      type: String,
      default: "新增",
    },
    headerLabel: String,
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    fields: {
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
    properties() {
      return this.$attrs.items || this.$attrs.properties;
    },
    formData() {
      return this.value;
    },
    fieldOption() {
      if (this.$attrs.items) {
        return this.value.map(() => {
          return { ...this.properties };
        });
      }
      return { ...this.properties };
    },
  },
  methods: {
    onDelete(index) {
      this.value.splice(index, 1);
      this.$emit("input", this.value);
    },
    updateValue(key, value) {
      if (typeof value === "string") {
        value = value.trim();
      }
      console.log("updateValue", key, value);
      // 一般组件通过input事件来更新数据，这里通过设置值来更新数据
      // 通过updateValue触发数据更新，会触发watcher的相关方法
      // 如果通过input更新，只会触发组件key的监听事件
      this.mainForm.updateValue(`${this.path}.${key}`, value);
    },
    addChildForm() {
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          this.$emit(
            "input",
            this.value.concat(generateFormDate(this.properties))
          );
        }
      });
    },
  },
  mounted() {
    this.mainForm.childFormRefs.push(this);
  },
};
</script>

<style scoped lang="scss">
@import "./style.scss";
.child-form-head {
  display: flex;
  span {
    flex: 1;
  }
}
</style>
