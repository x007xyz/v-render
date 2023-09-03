<script>
import RenderField from "../render-field/render-field.vue";
export default {
  name: "render-list",
  functional: true,
  props: {
    parentPath: String,
    schema: Array,
  },
  inject: ["root"],
  render(h, context) {
    console.log("🚀 ~ file: render-list.vue:10 ~ render ~ context:", context);
    const { schema, parentPath } = context.props;

    const root = context.injections.root;

    // const { rules = [], label, key } = schema;

    const values = root.getValueByPath(parentPath);
    console.log("🚀 ~ file: render-list.vue:20 ~ render ~ values:", values);

    return schema.map((item) => {
      // const path = [parentPath, item.key].filter(Boolean).join(".");
      return h(RenderField, {
        props: {
          parentPath: parentPath,
          schema: { type: "normal-input", ...item },
        },
      });
    });
  },
};
</script>
<style lang="css" scoped></style>
