<script>
import { getWidgetName, getWidget } from "../../core/getWidgetName";
// import { parseAllExpression } from "../../core/expression";
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
    const widgetName =
      schema.readonly || (root.readonly && schema.readonly !== false)
        ? "Html"
        : getWidgetName(schema);
    const widget = getWidget(widgetName, root.widgets);

    const value = root.getValueByPath(path);

    return h(widget, {
      props: {
        placeholder: getWidgetName(schema),
        value,
        ...getProps(schema),
        schema: schema,
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
