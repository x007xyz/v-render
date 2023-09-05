<script>
import RenderField from "./render-field.vue";
export default {
  name: "field-object",
  functional: true,
  props: {
    path: String,
    schema: Object,
  },
  inject: ["root"],
  render(h, context) {
    const { path, schema } = context.props;
    console.log("🚀 ~ file: field-object.vue:11 ~ context:", path, schema);
    return h(
      "div",
      { class: "box" },
      Object.entries(schema.properties).map(([key, value]) => {
        return h(RenderField, {
          props: {
            path: [path, key].filter(Boolean).join("."),
            schema: value,
          },
        });
      })
    );
  },
};
</script>
<style lang="css">
.box {
  border: 1px solid #ccc;
}
</style>
