import NormalInput from './normal-input.vue'
export default {
  functional: true,
  props: {
    textModel: Boolean
  },
  render (h, context) {
    console.log(context)
    if (context.props.textModel) {
      return <div className="text-model">{context.data.model.value || '-'}</div>
    } else {
      return h(NormalInput, context.data, context.children)
    }
  }
}
