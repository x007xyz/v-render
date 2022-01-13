import VSwitch from "./switch.vue";
export default {
  functional: true,
  props: {
    textModel: Boolean,
  },
  render(h, context) {
    if (context.props.textModel) {
      let { value } = context.data.attrs;
      if (typeof value === "boolean") {
        value = value ? "是" : "否";
      } else {
        value = "-";
      }
      return <div className="text-model">{value}</div>;
    } else {
      return h(VSwitch, context.data, context.children);
    }
  },
};
