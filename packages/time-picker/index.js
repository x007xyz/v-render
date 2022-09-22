import TimePicker from "./time-picker.vue";
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
        type = "time",
        format,
        "range-separator": separator,
      } = context.data.attrs;
      if (value) {
        format = format || "HH:mm:ss";
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
      return h(TimePicker, context.data, context.children);
    }
  },
};
