import DatePicker from "./date-picker.vue";
import { formatDate } from "element-ui/lib/utils/date-util";
export default {
  functional: true,
  props: {
    textModel: Boolean,
  },
  render(h, context) {
    if (context.props.textModel) {
      let {
        value,
        type = "date",
        format,
        "range-separator": separator,
      } = context.data.attrs;
      console.log("context", context);
      if (value) {
        format =
          format ||
          (type.indexOf("datetime") > -1
            ? "yyyy-MM-dd HH:mm:ss"
            : "yyyy-MM-dd");
        if (type.indexOf("range") > 1) {
          // type 包含range，value应该是一个数组类型
          value =
            (value[0] ? formatDate(value[0], format) : "") +
            (separator || "-") +
            (value[1] ? formatDate(value[1], format) : "");
        } else {
          value = formatDate(value, format);
        }
      }
      return <div className="text-model">{value || "-"}</div>;
    } else {
      return h(DatePicker, context.data, context.children);
    }
  },
};
