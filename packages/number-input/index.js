import NumberInput from "./number-input.vue";
import { toThousands, padZore } from "./utils";
export default {
  functional: true,
  props: {
    textModel: Boolean,
  },
  render(h, context) {
    if (context.props.textModel) {
      let { value, unit = 1, zeroPadding = 0 } = context.data.attrs;
      value = value ? toThousands(padZore(value / unit, zeroPadding)) : "-";
      return <div className="text-model">{value}</div>;
    } else {
      return h(NumberInput, context.data, context.children);
    }
  },
};
