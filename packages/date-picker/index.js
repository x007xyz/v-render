import DatePicker from "./date-picker.vue";
import { formatDate, getWeekNumber } from "element-ui/lib/utils/date-util";

const formatDateWeek = (value, format) => {
  let week = getWeekNumber(value);
  let month = value.getMonth();
  const trueDate = new Date(value);
  if (week === 1 && month === 11) {
    trueDate.setHours(0, 0, 0, 0);
    trueDate.setDate(trueDate.getDate() + 3 - ((trueDate.getDay() + 6) % 7));
  }
  let date = formatDate(trueDate, format);

  date = /WW/.test(date)
    ? date.replace(/WW/, week < 10 ? "0" + week : week)
    : date.replace(/W/, week);
  return date;
};
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
      if (value) {
        format =
          format ||
          (type.indexOf("datetime") > -1
            ? "yyyy-MM-dd HH:mm:ss"
            : "yyyy-MM-dd");
        if (type === "week") {
          value = formatDateWeek(value, format);
        } else if (type.indexOf("range") > 1) {
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
