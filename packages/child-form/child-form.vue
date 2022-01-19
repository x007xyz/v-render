<template>
  <div class="child-form-container">
    <div class="child-form" v-for="(data, index) in value" :key="index">
      <div class="child-form-head">{{ headerLabel }}{{ index + 1 }}</div>
      <div class="child-form-body">
        <el-form
          ref="form"
          :model="value[index]"
          :label-width="labelWidth"
          :label-position="labelPosition"
        >
          <template v-for="(row, rowIndex) in curFields">
            <el-row :gutter="20" :key="rowIndex" class="block-content">
              <template v-for="rowItem in row">
                <div :key="rowItem.key">
                  <el-col
                    :span="rowItem.span"
                    :key="rowItem.key"
                    :style="rowItem.style || {}"
                  >
                    <el-form-item
                      v-if="rowItem.type !== 'child-form'"
                      :style="rowItem.style"
                      :class="rowItem.class"
                      :rules="rowItem.rules"
                      :label="rowItem.label"
                      :prop="rowItem.key"
                    >
                      <component
                        :is="rowItem.type"
                        :key="rowItem.key"
                        :value="data[rowItem.key]"
                        @input="updateValue(index, rowItem.key, $event)"
                        v-bind="rowItem.props"
                      ></component>
                    </el-form-item>
                  </el-col>
                </div>
              </template>
            </el-row>
          </template>
        </el-form>
      </div>
    </div>

    <div class="child-form-add-btn" @click="addChildForm">
      {{ addBtnLabel }}
    </div>
  </div>
</template>

<script>
import clonedeep from "lodash.clonedeep";
import { getFieldRow, getAllFields } from "../render-form/utils.js";
export default {
  name: "ChildForm",
  components: {
    NormalInput: () => import("../normal-input"),
  },
  props: {
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
  computed: {
    // 完整的fields，合并了默认值，全局设置
    allFields() {
      return getAllFields(clonedeep(this.fields), {
        allDisabled: this.disabled,
        textModel: this.textModel,
      });
    },
    curFields() {
      const fields = this.allFields.filter((field) => !field.hidden);
      return getFieldRow(fields);
    },
  },
  watch: {
    value: {
      handler(data) {
        if (!data || data.length === 0) {
          const res = {};
          this.allFields.forEach((field) => {
            res[field.key] = field.defaultValue;
          });
          this.$emit("input", [res]);
        }
      },
      immediate: true,
    },
  },
  methods: {
    updateValue(index, key, value) {
      console.log(key);
      if (typeof value === "string") {
        value = value.trim();
      }
      this.$emit(
        "input",
        this.value.map((item, i) => {
          if (i === index) {
            item[key] = value;
          }
          return item;
        })
      );
    },
    addChildForm() {
      const res = {};
      this.allFields.forEach((field) => {
        res[field.key] = field.defaultValue;
      });
      this.$emit("input", this.value.concat(res));
    },
  },
};
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
