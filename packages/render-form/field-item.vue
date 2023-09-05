<script>
import { getWidgetName } from "../../core/getWidgetName";
import { getFieldProps } from "../../core/getProps";
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
    console.log(
      "🚀 ~ file: field-item.vue:11 ~ context:",
      schema,
      path,
      getWidgetName(schema)
    );
    const root = context.injections.root;
    return h(
      "el-form-item",
      {
        props: getFieldProps(schema, path),
        key: path,
      },
      [
        h("el-input", {
          props: {
            placeholder: getWidgetName(schema),
            value: root.getValueByPath(path),
          },
          attrs: {
            placeholder: getWidgetName(schema),
          },
          on: {
            input(e) {
              root.setValueByPath(e, path);
            },
          },
        }),
      ]
    );
  },
};
</script>
<style lang="css" scoped></style>
