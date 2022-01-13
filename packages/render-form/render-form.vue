<template>
  <div class="render-form" :class="{ 'border-form': borderForm }">
    <div class="scan-type">
      <div class="block-btn-list" v-if="scanType === 'single'">
        <template v-for="block in curFields">
          <div
            class="block-btn"
            :class="{ focus: singleScanBlock === block.id }"
            v-if="block.label"
            @click="() => (singleScanBlock = block.id)"
            :key="block.id"
          >
            {{ block.label }}
          </div>
        </template>
      </div>
    </div>
    <el-form
      ref="form"
      :model="formData"
      :hide-required-asterisk="textModel"
      :label-width="labelWidth"
      :label-position="labelPosition"
    >
      <!-- 区块级，每个 filed 是一个区块 -->
      <div v-for="block in curFields" :key="block.label">
        <div
          :class="block.class"
          v-if="
            scanType === 'normal' ||
            (scanType === 'single' && singleScanBlock === block.id)
          "
          :style="block.style"
        >
          <div v-if="block.label" class="block-title">
            <div class="block-line"></div>
            <span class="block-text" :id="block.id">{{ block.label }}</span>
            <template v-if="showFoldBtn && !textModel && scanType === 'normal'">
              <span
                class="block-fold-btn"
                v-if="foldBlockList.indexOf(block.id) === -1"
                @click="foldBlock(block)"
              >
                收起
                <i class="el-icon-arrow-up"></i>
              </span>
              <span class="block-fold-btn" v-else @click="foldBlock(block)">
                展开
                <i class="el-icon-arrow-down"></i>
              </span>
            </template>
          </div>

          <template v-for="(row, rowIndex) in block.children">
            <el-row
              :gutter="20"
              :key="rowIndex"
              class="block-content"
              :class="{ 'block-hidden': foldBlockList.indexOf(block.id) > -1 }"
            >
              <template v-for="rowItem in row">
                <div :key="rowItem.key">
                  <el-col
                    :span="rowItem.span"
                    :key="rowItem.key"
                    :style="rowItem.style || {}"
                  >
                    <div v-if="rowItem.type === 'slot-single'">
                      <slot :name="rowItem.name"></slot>
                    </div>
                    <el-form-item
                      v-else
                      :style="rowItem.style"
                      :class="rowItem.class"
                      :rules="rowItem.rules"
                      :label="rowItem.label ? rowItem.label + ':' : ''"
                      :prop="rowItem.key"
                    >
                      <div v-if="rowItem.type === 'slot'">
                        <slot :name="rowItem.name"></slot>
                      </div>
                      <ChildForm
                        v-if="rowItem.type === 'form'"
                        v-model.trim="formData[rowItem.key]"
                        v-bind="rowItem.props"
                      />
                      <NormalInput
                        v-if="rowItem.type === 'input'"
                        :value="formData[rowItem.key]"
                        @input="updateValue(rowItem.key, $event)"
                        v-bind="rowItem.props"
                      >
                      </NormalInput>
                      <NumberInput
                        v-if="rowItem.type === 'number'"
                        :value="formData[rowItem.key]"
                        @input="updateValue(rowItem.key, $event)"
                        v-bind="rowItem.props"
                      >
                      </NumberInput>
                      <NormalSelect
                        v-if="rowItem.type === 'select'"
                        :value="formData[rowItem.key]"
                        @input="updateValue(rowItem.key, $event)"
                        v-bind="rowItem.props"
                      >
                      </NormalSelect>
                      <RadioGroup
                        v-if="rowItem.type === 'radio'"
                        :value="formData[rowItem.key]"
                        @input="updateValue(rowItem.key, $event)"
                        v-bind="rowItem.props"
                      >
                      </RadioGroup>
                      <CheckboxGroup
                        v-if="rowItem.type === 'checkbox'"
                        :value="formData[rowItem.key]"
                        @input="updateValue(rowItem.key, $event)"
                        v-bind="rowItem.props"
                      >
                      </CheckboxGroup>
                      <VSwitch
                        v-if="rowItem.type === 'switch'"
                        :value="formData[rowItem.key]"
                        @input="updateValue(rowItem.key, $event)"
                        v-bind="rowItem.props"
                      >
                      </VSwitch>
                      <DatePicker
                        v-if="rowItem.type === 'date'"
                        :value="formData[rowItem.key]"
                        @input="updateValue(rowItem.key, $event)"
                        v-bind="rowItem.props"
                      >
                      </DatePicker>
                    </el-form-item>
                  </el-col>
                </div>
              </template>
            </el-row>
          </template>
          <!-- <el-divider v-if="field.divider" /> -->
        </div>
      </div>
      <!-- 表头加粗文字开始 -->
    </el-form>
  </div>
</template>

<script>
import clonedeep from "lodash.clonedeep";
import { getFieldRow, getAllBlocks } from "./utils.js";
export default {
  name: "render-form",
  components: {
    NormalInput: () => import("../normal-input"),
    NumberInput: () => import("../number-input"),
    NormalSelect: () => import("../normal-select"),
    RadioGroup: () => import("../radio-group"),
    CheckboxGroup: () => import("../checkbox-group"),
    VSwitch: () => import("../switch"),
    DatePicker: () => import("../date-picker"),
    ChildForm: () => import("../child-form/child-form.vue"),
  },
  props: {
    // watcher 监听数据变化
    // 只在表单修改数据时监听，直接修改formData的值时不触发
    watcher: {
      type: Object,
      default() {
        return {};
      },
    },
    // 表单模式
    scanType: {
      type: String,
      default: "normal", // normal or single
    },
    // 是否显示收起/展开按钮
    showFoldBtn: {
      type: Boolean,
      default: false,
    },
    // 整体的属性
    // 全部表单元素禁用。
    allDisabled: {
      type: Boolean,
      default: false,
    },
    // 是否给表单显示border 外框，包含区块外侧有一个 boder，以及区块标题的灰色背景
    borderForm: {
      type: Boolean,
      default: true,
    },
    // 文字模式。不显示表单组件，而是只显示纯文字内容 同时，纯文本模式（即值为 true 的时候），会隐藏表单要素 label 左边的星号
    textModel: {
      type: Boolean,
      default: false,
    },
    // 自定义表单每个要素的列。
    // 如果是 6 则为 一行 4 列，12 则为 1 行 2 列。
    // 优先级高于表单要素本身的设置
    // 如果为 0，则使用表单要素本身的设置
    formItemCol: {
      type: [Number, String],
      default: 12,
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
    fields: {
      type: Array,
      default() {
        return [];
      },
    },
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // 折叠block列表
      foldBlockList: [],
      // 浏览模式为single时，显示哪个block
      singleScanBlock: "",
      // 更新field options的值，根据key匹配
      updateField: {},
      formData: {},
    };
  },
  watch: {
    scanType: {
      handler(val) {
        if (val === "single") {
          this.foldBlockList = [];
          this.singleScanBlock = this.allFields[0].id;
        } else {
          this.singleScanBlock = "";
        }
      },
      immediate: true,
    },
  },
  computed: {
    globalOptions() {
      return {
        borderForm: this.borderForm,
        allDisabled: this.allDisabled,
        textModel: this.textModel,
        formItemCol: this.formItemCol,
      };
    },
    // 完整的fields，合并了默认值，全局设置
    allFields() {
      console.log("allFields");
      return getAllBlocks(
        clonedeep(this.fields),
        this.globalOptions,
        this.updateField
      );
    },
    curFields() {
      return this.allFields.map((block) => {
        // 对字段进行布局处理
        // 对属性为hidden的字段进行过滤
        // 需要将字段划分到每行
        const fields = block.children.filter((field) => !field.hidden);
        return { ...block, children: getFieldRow(fields) };
      });
    },
  },
  methods: {
    // 根据fields和data的值，初始化 formData 的值
    initFormData() {
      this.$set(this, "formData", {});
      // 通过fields初始化formData的key
      this.allFields.forEach((fields) => {
        if (fields.children && Array.isArray(fields.children)) {
          fields.children.forEach((field) => {
            // 如果key已经在data中，就取data中的值
            if (field.key) {
              if (field.key in this.data) {
                this.$set(this.formData, field.key, this.data[field.key]);
              } else {
                this.$set(this.formData, field.key, field.defaultValue);
              }
            }
          });
        }
      });
    },
    // 更新数据
    updateFormData(data) {
      Object.keys(data).forEach((key) => {
        // 如果 key 在值里面
        if (key in this.formData) {
          // 则回填这个值
          this.updateValue(key, data[key]);
        }
      });
    },
    updateValue(key, value) {
      if (typeof value === "string") {
        value = value.trim();
      }
      // 更新数据
      this.$set(this.formData, key, value);
      this.$nextTick(() => {
        this.watcher[key] &&
          this.watcher[key](value, this.formData, (key, options) => {
            this.$set(this.updateField, key, options);
          });
      });
    },
    // 更新
    foldBlock(block) {
      const index = this.foldBlockList.findIndex((id) => id === block.id);
      if (index > -1) {
        this.foldBlockList.splice(index, 1);
      } else {
        this.foldBlockList.push(block.id);
      }
    },
    foldAllBlock() {
      if (this.foldBlockList.length === 0) {
        this.foldBlockList = this.allFields.map(({ id }) => id);
      } else {
        this.foldBlockList = [];
      }
    },
    // 浏览模式切换
    changeScanType() {
      if (this.scanType === "normal") {
        this.$emit("update:scanType", "single");
      } else {
        this.$emit("update:scanType", "normal");
      }
    },
    // 获取表单数据
    getData() {
      return clonedeep(this.formData);
    },
    // 校验表单数据
    validate() {
      return this.$refs.form.validate();
    },
  },
  created() {
    this.initFormData();
    this.$watch("fields", () => {
      this.initFormData();
    });
    this.$watch("data", () => {
      this.initFormData();
    });
  },
};
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
