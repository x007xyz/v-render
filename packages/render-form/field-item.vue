<script>
import { getWidgetName, getWidget } from "../../core/getWidgetName";
import { parseAllExpression } from "../../core/expression";
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

    const value = root.getValueByPath(path);

    const newSchema = parseAllExpression(
      schema,
      root.getValues(),
      path,
      root.rootSchema
    );

    return h(widget, {
      props: {
        placeholder: getWidgetName(newSchema),
        value,
        ...getProps(newSchema),
        schema: newSchema,
      },
      attrs: {
        placeholder: getWidgetName(newSchema),
        ...getProps(newSchema),
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
