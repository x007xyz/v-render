import VSwitch from "./switch.vue";
export default {
  functional: true,
  props: {
    textModel: Boolean,
  },
  render(h, context) {
    if (context.props.textModel) {
      let { value, activeValue, inactiveValue, activeText, inactiveText } =
        context.data.attrs;
      if (typeof value === "boolean") {
        value = value ? activeText || "是" : inactiveText || "否";
      } else if (activeValue || inactiveValue) {
        if (activeValue === value) {
          value = activeText || "是";
        }
        if (inactiveValue === value) {
          value = inactiveText || "否";
        }
      } else {
        value = "-";
      }
      return <div className="text-model">{value}</div>;
    } else {
      return h(VSwitch, context.data, context.children);
    }
  },
};
