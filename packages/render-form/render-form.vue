<template>
  <div class="render-form" :class="{ 'border-form': borderForm }">
    <div class="scan-type" v-if="scanType === 'single'">
      <div class="block-btn-list">
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
      <Field
        v-for="(property, key) in rootSchema.properties"
        :key="key"
        :path="key"
        :schema="property"
      ></Field>
      <!-- 区块级，每个 filed 是一个区块 -->
      <!-- <div v-for="block in allFields" :key="block.label">
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
            <el-col
              v-for="rowItem in block.children"
              v-show="!rowItem.hidden"
              :key="rowItem.key"
              :span="rowItem.span"
              :style="rowItem.style || {}"
            >
              <Field
                :key="rowItem.key"
                :parentPath="path"
                :schema="rowItem"
              ></Field>
            </el-col>
          </div>
        </div>
      </div> -->
      <!-- 表头加粗文字开始 -->
    </el-form>
  </div>
</template>

<script>
import { get, set } from "lodash-es";
import Field from "./render-field";

import { createDataSkeleton } from "../../core/genData4Schema";

export default {
  name: "render-form",
  components: {
    Field,
  },
  provide() {
    return {
      root: this,
    };
  },
  props: {
    path: {
      type: String,
      default: "",
    },
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
    schema: {
      type: Object,
      default() {
        return {};
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
      // 更新field options的值，根据key匹配
      updateField: {},
      formData: {},
      rootSchema: {},
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
    schema: {
      handler(val) {
        this.setSchema(val);
      },
      immediate: true,
    },
  },
  computed: {
    // 子表单监听方法
    // watcherChildFormObj() {
    //   const res = {};
    //   Object.keys(this.watcher).forEach((key) => {
    //     const [childFormKey, fieldKey] = key.split(".$.");
    //     if (childFormKey && fieldKey) {
    //       if (res[childFormKey]) {
    //         res[childFormKey][fieldKey] = this.watcher[key];
    //       } else {
    //         res[childFormKey] = { [fieldKey]: this.watcher[key] };
    //       }
    //     }
    //   });
    //   return res;
    // },
    // globalOptions() {
    //   return {
    //     borderForm: this.borderForm,
    //     allDisabled: this.allDisabled,
    //     textModel: this.textModel,
    //     formItemCol: this.formItemCol,
    //     formItemSize: this.formItemSize,
    //   };
    // },
    // // 完整的fields，合并了默认值，全局设置
    // allFields() {
    //   return getAllBlocks(
    //     clonedeep(this.fields),
    //     this.globalOptions,
    //     this.updateField
    //   );
    // },
    // curFields() {
    //   return this.allFields.map((block) => {
    //     // 对字段进行布局处理
    //     // 对属性为hidden的字段进行过滤
    //     // 需要将字段划分到每行
    //     const fields = block.children.filter((field) => !field.hidden);
    //     return { ...block, children: getFieldRow(fields) };
    //   });
    // },
  },
  methods: {
    setSchema(schema) {
      // 对schema进行处理，补全默认值
      this.rootSchema = schema;
      // 根据schema初始化formData，mode为update时，更新formData，否则重置formData
      // this.genFormDataBySchema(schema, mode);
      this.formData = createDataSkeleton(schema, this.formData);
    },
    getValueByPath(path) {
      return get(this.formData, path);
    },
    setValueByPath(value, path) {
      set(this.formData, path, value);
      // 处理路径
      // path = path.replace(/\[(\w+)\]/g, ".$1");
      // path = path.replace(/^\./, "");
      // const paths = path.split(".");
      // console.log(
      //   "🚀 ~ file: render-form.vue:276 ~ setValueByPath ~ paths:",
      //   paths
      // );
      // const key = paths.pop();
      // let tempObj = this.formData;
      // for (let i = 0; i < paths.length; i++) {
      //   if (tempObj[paths[i]] === undefined) {
      //     this.$set(tempObj, paths[i], {});
      //   }
      //   tempObj = tempObj[paths[i]];
      // }
      // console.log(
      //   "🚀 ~ file: render-form.vue:287 ~ setValueByPath ~ tempObj:",
      //   tempObj
      // );
      // this.$set(tempObj, key, value);
    },
    // genFormDataBySchema() {
    //   // 根据schema初始化formData
    // },
    // getPropByPath,
    // setPropByPath(obj, path, value) {
    //   // 处理路径
    //   path = path.replace(/\[(\w+)\]/g, ".$1");
    //   path = path.replace(/^\./, "");
    //   let tempObj = obj;
    //   const paths = path.split(".");
    //   const key = paths.pop();
    //   for (let i = 0; i < paths.length; i++) {
    //     if (tempObj[paths[i]] === undefined) {
    //       this.$set(tempObj, paths[i], {});
    //     }
    //     tempObj = tempObj[paths[i]];
    //   }
    //   this.$set(tempObj, key, value);
    // },
    // triggerWatcher(key) {
    //   const watcherItem = this.watcher[key];
    //   if (watcherItem) {
    //     (isFunction(watcherItem) ? watcherItem : watcherItem.handler)(
    //       getPropByPath(this.formData, key),
    //       this.formData,
    //       (key, options) => {
    //         this.$set(this.updateField, key, options);
    //       }
    //     );
    //   }
    // },
    // // 根据fields和data的值，初始化 formData 的值
    // initFormData(data = {}) {
    //   this.$set(this, "formData", {});
    //   // 通过fields初始化formData的key
    //   this.allFields.forEach((fields) => {
    //     if (fields.children && Array.isArray(fields.children)) {
    //       fields.children.forEach((field) => {
    //         // 如果key已经在data中，就取data中的值
    //         if (field.key) {
    //           this.setPropByPath(
    //             this.formData,
    //             field.key,
    //             getPropByPath(data, field.key, field.defaultValue)
    //           );
    //         }
    //       });
    //     }
    //   });
    //   this.$nextTick(() => {
    //     // 执行所有watcher,存在$不执行,只有immmediate为true执行
    //     Object.keys(this.watcher).forEach((key) => {
    //       if (
    //         !/\$/.test(key) &&
    //         isObject(this.watcher[key]) &&
    //         this.watcher[key].immediate
    //       ) {
    //         this.triggerWatcher(key);
    //       }
    //     });
    //     this.$refs.form.clearValidate();
    //   });
    // },
    // // 更新数据
    // updateFormData(data, parentPath = "") {
    //   Object.keys(data).forEach((key) => {
    //     const path = parentPath ? `${parentPath}.${key}` : key;
    //     if (hasPropByPath(this.formData, path)) {
    //       if (isObject(data[key])) {
    //         this.updateFormData(data[key], path);
    //       } else {
    //         this.updateValue(path, data[key]);
    //       }
    //     }
    //   });
    // },
    // updateValue(key, value) {
    //   if (typeof value === "string") {
    //     value = value.trim();
    //   }
    //   // 更新数据
    //   this.setPropByPath(this.formData, key, value);
    //   this.$nextTick(() => {
    //     this.triggerWatcher(key);
    //   });
    // },
    // updateFieldProp(key, options) {
    //   this.$set(this.updateField, key, options);
    // },
    // // 更新
    // foldBlock(block) {
    //   const index = this.foldBlockList.findIndex((id) => id === block.id);
    //   if (index > -1) {
    //     this.foldBlockList.splice(index, 1);
    //   } else {
    //     this.foldBlockList.push(block.id);
    //   }
    // },
    // foldAllBlock() {
    //   if (this.foldBlockList.length === 0) {
    //     this.foldBlockList = this.allFields.map(({ id }) => id);
    //   } else {
    //     this.foldBlockList = [];
    //   }
    // },
    // // 浏览模式切换
    // changeScanType() {
    //   if (this.scanType === "normal") {
    //     this.$emit("update:scanType", "single");
    //   } else {
    //     this.$emit("update:scanType", "normal");
    //   }
    // },
    // // 获取表单数据
    // getData() {
    //   return clonedeep(this.formData);
    // },
    // // 校验表单数据
    // validate() {
    //   return this.$refs.form.validate().then((valid) => {
    //     if (valid) {
    //       return Promise.all(
    //         this.childFormRefs.map((childForm) => {
    //           return childForm.validateAllForm();
    //         })
    //       ).then((res) => {
    //         return res.every((item) => item);
    //       });
    //     }
    //     return valid;
    //   });
    // },
  },
  created() {
    // this.initFormData();
    // this.$watch("fields", () => {
    //   this.initFormData();
    // });
    // this.$watch("data", () => {
    //   this.initFormData();
    // });
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
