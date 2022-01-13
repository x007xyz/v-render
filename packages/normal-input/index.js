import NormalInput from "./normal-input.vue";
export default {
  functional: true,
  inheritAttrs: false,
  props: {
    textModel: Boolean,
  },
  render(h, context) {
    if (context.props.textModel) {
      return (
        <div className="text-model">{context.data.attrs.value || "-"}</div>
      );
    } else {
      return h(NormalInput, context.data, context.children);
    }
  },
};
