<script>
import { getWidgetName, getWidget } from "../../core/getWidgetName";
// import { getSchemaFromFlatten } from "../../core/flattenSchema";
import getProps from "../../core/getProps";
export default {
  name: "field-item",
  functional: true,
  props: {
    path: String,
    schema: Object,
  },
  inject: ["root"],
  render(h, context) {
    const { schema, path } = context.props;
    const root = context.injections.root;
    const widgetName = getWidgetName(schema);
    const widget = getWidget(widgetName, root.widgets);

    return h(widget, {
      props: {
        placeholder: getWidgetName(schema),
        value: root.getValueByPath(path),
        ...getProps(schema),
        schema,
      },
      attrs: {
        placeholder: getWidgetName(schema),
        ...getProps(schema),
      },
      on: {
        input(e) {
          root.setValueByPath(e, path);
        },
      },
    });
  },
};
</script>
<style lang="css" scoped></style>
