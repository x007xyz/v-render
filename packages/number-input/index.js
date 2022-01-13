import NumberInput from "./number-input.vue";
import { toThousands, padZore } from "./utils";
export default {
  functional: true,
  props: {
    textModel: Boolean,
  },
  render(h, context) {
    if (context.props.textModel) {
      return (
        <div className="text-model">
          {() => {
            const { value } = context.data.model;
            if (value) {
              return toThousands(padZore(value, this.zeroPadding));
            } else {
              return "-";
            }
          }}
        </div>
      );
    } else {
      return h(NumberInput, context.data, context.children);
    }
  },
};
