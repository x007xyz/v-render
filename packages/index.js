import dayjs from "dayjs";
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

export default {
  install(Vue) {
    Vue.component("RenderForm", RenderForm);
    Vue.component("RenderTable", RenderTable);
    registerFormatter("formatDateTime", (date) => {
      return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    });
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
      options.type = "normal-input";
    });
    registerHandler("checkbox", (options) => {
      options.type = "checkbox-group";
      if (options.defaultValue === "") {
        options.defaultValue = [];
      }
    });
    registerHandler("radio", (options) => {
      options.type = "radio-group";
    });
    registerHandler("select", (options) => {
      options.type = "normal-select";
    });
    registerHandler("switch", (options) => {
      options.type = "normal-switch";
      if (options.defaultValue === "") {
        options.defaultValue = false;
      }
    });
    registerHandler("date", (options) => {
      options.type = "date-picker";
    });

    Vue.component("dict-select", DictSelect);

    registerHandler("dict", (options) => {
      options.type = "dict-select";
    });

    Vue.component("search-select", SearchSelect);

    registerHandler("search", (options) => {
      options.type = "search-select";
    });

    Vue.component("child-form", ChildForm);

    registerHandler("form", (options) => {
      options.type = "child-form";
      options.span = 24;
      if (options.defaultValue === "") {
        options.defaultValue = [];
      }
    });

    registerHandler("slot-single", (options) => {
      options.span = 24;
    });
  },
};
