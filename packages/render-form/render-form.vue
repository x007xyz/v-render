<template>
  <div class="render-form" :class="{ 'border-form': borderForm }">
    <div class="scan-type" v-if="scanType === 'single'">
      <div class="block-btn-list">
        <template v-for="block in allBlocks">
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
      <div v-for="block in allBlocks" :key="block.label">
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
          <div class="flex-box">
            <RenderField
              v-for="rowItem in block.children"
              :key="rowItem.prop"
              :prop="rowItem.prop"
              :comp="rowItem.comp"
            >
            </RenderField>
            <!-- <el-col
              v-for="rowItem in block.children"
              v-show="!rowItem.hidden"
              :key="rowItem.key"
              :span="rowItem.span"
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
                :label="rowItem.label ? rowItem.label + ':' : ' '"
                :prop="rowItem.key"
              >
                <div v-if="rowItem.type === 'slot'">
                  <slot :name="rowItem.name" v-bind="rowItem"></slot>
                </div>
                <component
                  v-else
                  :is="rowItem.type"
                  :key="rowItem.key"
                  :value="getPropByPath(formData, rowItem.key)"
                  @input="updateValue(rowItem.key, $event)"
                  :watcher="watcherChildFormObj[rowItem.key]"
                  style="width: 100%"
                  v-bind="rowItem.props"
                ></component>
              </el-form-item>
            </el-col> -->
          </div>
          <!-- <el-divider v-if="field.divider" /> -->
        </div>
      </div>
      <!-- 表头加粗文字开始 -->
    </el-form>
  </div>
</template>

<script>
import clonedeep from "lodash.clonedeep";
import merge from "lodash.merge";
import { getAllBlocks, getFieldOptions } from "./utils.js";
import { hasPropByPath, getPropByPath } from "./core/utils";

export default {
  name: "render-form",
  components: {
    RenderField: () => import("./core/render-field.vue"),
  },
  provide() {
    return {
      mainForm: this,
    };
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
    // 表单组件占据每一个form-item的宽度
    // 可以设置常用的width的值
    formItemSize: {
      type: String,
      default: "80%",
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
      childFormRefs: [],
      // 折叠block列表
      foldBlockList: [],
      // 浏览模式为single时，显示哪个block
      singleScanBlock: "",
      formData: {},
      fieldOptions: [],
    };
  },
  watch: {
    globalOptions() {
      this.initFieldOptions();
    },
    scanType: {
      handler(val) {
        if (val === "single") {
          this.foldBlockList = [];
          this.singleScanBlock = this.allBlocks[0].id;
        } else {
          this.singleScanBlock = "";
        }
      },
      immediate: true,
    },
  },
  computed: {
    // 子表单监听方法
    watcherChildFormObj() {
      const res = {};
      Object.keys(this.watcher).forEach((key) => {
        const [childFormKey, fieldKey] = key.split(".$.");
        if (childFormKey && fieldKey) {
          if (res[childFormKey]) {
            res[childFormKey][fieldKey] = this.watcher[key];
          } else {
            res[childFormKey] = { [fieldKey]: this.watcher[key] };
          }
        }
      });
      return res;
    },
    globalOptions() {
      return {
        borderForm: this.borderForm,
        allDisabled: this.allDisabled,
        textModel: this.textModel,
        formItemCol: this.formItemCol,
        formItemSize: this.formItemSize,
      };
    },
    // 模块数组
    allBlocks() {
      return getAllBlocks(this.fields, this.globalOptions);
    },
  },
  methods: {
    getFieldOptionByProp(prop) {
      return this.fieldOptions.find((item) => item.key === prop);
    },
    setPropByPath(obj, path, value, defaultValue = "") {
      // 处理路径
      path = path.replace(/\[(\w+)\]/g, ".$1");
      path = path.replace(/^\./, "");
      let tempObj = obj;
      const paths = path.split(".");
      const key = paths.pop();
      for (let i = 0; i < paths.length; i++) {
        if (tempObj[paths[i]] === undefined) {
          this.$set(tempObj, paths[i], {});
        }
        tempObj = tempObj[paths[i]];
      }
      if (tempObj[key] === undefined) {
        this.$set(tempObj, key, defaultValue);
      } else {
        this.$set(tempObj, key, value);
      }
    },
    init() {
      this.initFieldOptions();
      this.initFormData();
    },
    // 初始化字段配置项
    initFieldOptions() {
      const fieldOptions = getFieldOptions(
        this.fields.reduce((res, { children }) => {
          return res.concat(children);
        }, []),
        this.globalOptions
      );
      this.$set(this, "fieldOptions", fieldOptions);
    },
    // 根据fields和data的值，初始化 formData 的值
    initFormData() {
      this.$set(this, "formData", {});
      // 通过fields初始化formData的key
      this.fieldOptions.forEach((field) => {
        // 如果key已经在data中，就取data中的值
        if (field.key) {
          this.setPropByPath(
            this.formData,
            field.key,
            this.formData[field.key],
            field.defaultValue
          );
        }
      });
      // 初始化formData时，应该触发所有watcher
      Object.keys(this.watcher).forEach((key) => {
        this.watcher[key](
          getPropByPath(this.formData, key),
          this.formData,
          this.updateFieldProp
        );
      });
      // 初始化清除所有校验
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    // 更新数据
    updateFormData(data) {
      Object.keys(data).forEach((key) => {
        if (hasPropByPath(this.formData, key)) {
          this.updateValue(key, data[key]);
        }
      });
    },
    onWatcher(path) {
      path = path.replace(/\[(\w+)\]/g, ".$1");
      path = path.replace(/^\./, "");
      let tempObj = this.formData;
      const paths = path.split(".");
      for (let i = 0; i < paths.length; i++) {
        const key = paths[i];
        this.watcher[key] &&
          this.watcher[key](tempObj[key], this.formData, this.updateFieldProp);
        tempObj = tempObj[key];
      }
    },
    updateValue(key, value) {
      if (typeof value === "string") {
        value = value.trim();
      }
      console.log("updateValue", key, value);
      // 更新数据
      this.setPropByPath(this.formData, key, value);
      // 触发监听方法
      this.onWatcher(key);
    },
    updateFieldProp(key, options) {
      const index = this.fieldOptions.findIndex((item) => item.key === key);
      if (index > -1) {
        this.$set(
          this.fieldOptions,
          index,
          merge(this.fieldOptions[index], options)
        );
      }
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
        this.foldBlockList = this.allBlocks.map(({ id }) => id);
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
      return this.$refs.form.validate().then((valid) => {
        if (valid) {
          return Promise.all(
            this.childFormRefs.map((childForm) => {
              return childForm.validateAllForm();
            })
          ).then((res) => {
            return res.every((item) => item);
          });
        }
        return valid;
      });
    },
  },
  created() {
    this.init();
    this.$watch("fields", () => {
      this.init();
    });
  },
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
