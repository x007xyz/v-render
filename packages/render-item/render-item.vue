<script>
export default {
  name: "render-item",
  functional: true,
  props: {
    scope: Object,
    render: [String, Function],
  },
  render(h, context) {
    console.log(context.props.scope);
    if (typeof context.props.render === "string") {
      return <template>{context.props.render}</template>;
    }
    return context.props.render(h, context.props.scope);
  },
};
</script>
<style lang="css" scoped></style>
