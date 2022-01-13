import NormalSelect from "./normal-select.vue";
export default {
  functional: true,
  props: {
    textModel: Boolean,
  },
  render(h, context) {
    if (context.props.textModel) {
      const { value, options } = context.data.attrs;
      const curOption = options.find((option) => option.value === value);
      const showValue = curOption ? curOption.label : "-";
      return <div className="text-model">{showValue}</div>;
    } else {
      return h(NormalSelect, context.data, context.children);
    }
  },
};
