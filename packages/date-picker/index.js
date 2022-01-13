import dayjs from "dayjs";
import DatePicker from "./date-picker.vue";
export default {
  functional: true,
  props: {
    textModel: Boolean,
  },
  render(h, context) {
    if (context.props.textModel) {
      let { value, type = "date" } = context.data.attrs;
      if (value) {
        let format = "YYYY-MM-DD";
        if (type.indexOf("datetime") > -1) {
          // 日期时间类型，格式化为YYYY-MM-DD HH:mm:ss
          format = "YYYY-MM-DD HH:mm:ss";
        }
        if (type.indexOf("range") > 1) {
          // type 包含range，value应该是一个数组类型
          value =
            (value[0] ? dayjs(value[0]).format(format) : "") +
            (value[1] ? dayjs(value[1]).format(format) : "");
        } else {
          value = dayjs(value).format(format);
        }
      }
      return <div className="text-model">{value || "-"}</div>;
    } else {
      return h(DatePicker, context.data, context.children);
    }
  },
};
