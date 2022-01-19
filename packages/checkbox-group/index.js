import CheckboxGroup from "./checkbox-group.vue";
export default {
  functional: true,
  props: {
    textModel: Boolean,
  },
  render(h, context) {
    if (context.props.textModel) {
      const { value, options } = context.data.attrs;
      const curOptions = options.filter((option) =>
        value.includes(option.value)
      );
      let showValue = "-";
      if (curOptions.length > 0) {
        showValue = curOptions.map(({ label }) => label).join("/");
      }
      return <div className="text-model">{showValue}</div>;
    } else {
      return h(CheckboxGroup, context.data, context.children);
    }
  },
};

export const dealOptions = (options) => {
  if (options.defaultValue === "") {
    options.defaultValue = [];
  }
  return options;
};
