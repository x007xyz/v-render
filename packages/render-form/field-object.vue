<script>
import RenderField from "./render-field.vue";
import { getWidgetName, getWidget } from "../../core/getWidgetName";
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
    const root = context.injections.root;
    const widgetName = getWidgetName(schema);
    const widget = getWidget(widgetName, root.widgets);
    return h(
      widget,
      { props: schema },
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
  overflow: hidden;
  width: 100%;
}
</style>
