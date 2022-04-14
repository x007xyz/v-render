import RenderForm, { registerHandler } from "./render-form";
import RenderTable, { registerFormatter } from "./render-table";
import NormalInput from "./normal-input";
import NumberInput from "./number-input";
import NormalSelect from "./normal-select";
import RadioGroup from "./radio-group";
import CheckboxGroup from "./checkbox-group";
import NormalSwitch from "./normal-switch";
import DatePicker from "./date-picker";

import DictSelect from "./dict-select";
import SearchSelect from "./search-select";
import ChildForm from "./child-form";
import TableSelect from "./table-select";
export default {
  install(Vue, customCompMap = {}, customFormatter = {}) {
    Vue.component("RenderForm", RenderForm);
    Vue.component("RenderTable", RenderTable);
    // 全局注册元素组件
    Vue.component("normal-input", NormalInput);
    Vue.component("number-input", NumberInput);
    Vue.component("normal-select", NormalSelect);
    Vue.component("radio-group", RadioGroup);
    Vue.component("checkbox-group", CheckboxGroup);
    Vue.component("normal-switch", NormalSwitch);
    Vue.component("date-picker", DatePicker);
    // 注册元素配置处理方法
    registerHandler("input", (options) => {
      options.widget = "normal-input";
    });
    registerHandler("number", (options) => {
      options.widget = "number-input";
      // 不能设置为number类型，否则如1,000这种无法展示
      // options.type = "number";
    });
    registerHandler("checkbox", (options) => {
      options.widget = "checkbox-group";
      options.type = "array";
      if (options.defaultValue === "") {
        options.defaultValue = [];
      }
    });
    registerHandler("radio", (options) => {
      options.widget = "radio-group";
    });
    registerHandler("select", (options) => {
      options.widget = "normal-select";
    });
    registerHandler("switch", (options) => {
      options.widget = "normal-switch";
      if (options.defaultValue === "") {
        options.defaultValue = false;
      }
    });
    registerHandler("date", (options) => {
      options.widget = "date-picker";
    });

    Vue.component("dict-select", DictSelect);

    registerHandler("dict", (options) => {
      options.widget = "dict-select";
    });

    Vue.component("search-select", SearchSelect);

    registerHandler("search", (options) => {
      options.widget = "search-select";
    });

    Vue.component("child-form", ChildForm);

    registerHandler("form", (options) => {
      options.widget = "child-form";
      options.type = "array";
      options.span = 24;
    });

    registerHandler("slot-single", (options) => {
      options.span = 24;
    });

    Vue.component("table-select", TableSelect);

    registerHandler("table", (options) => {
      options.widget = "table-select";
      options.span = 24;
      if (options.defaultValue === "") {
        options.defaultValue = [];
      }
    });
    // 自定义组件
    Object.keys(customCompMap).forEach((key) => {
      const item = customCompMap[key];
      Vue.component(key, item.component);

      registerHandler(key, item.handler || function () {});
    });
    // 自定义formatter
    Object.keys(customFormatter).forEach((key) => {
      registerFormatter(key, customFormatter[key]);
    });
  },
};
