<script>
import { getWidgetName } from "../../core/getWidgetName";
import { getFieldProps } from "../../core/getProps";
import { getParentSchemaFromFlatten } from "../../core/flattenSchema";
export default {
  name: "wrapper",
  functional: true,
  props: {
    path: String,
    schema: Object,
  },
  inject: ["root"],
  render(h, context) {
    const { schema, path } = context.props;
    console.log(context, schema, path, getWidgetName(schema));
    const root = context.injections.root;

    const parentSchema = getParentSchemaFromFlatten(root.flattenSchema, path);
    // 应该去找父级，而不是找根元素
    return h(
      "el-col",
      {
        span: schema.span || parentSchema.fieldSpan || root.fieldSpan,
      },
      [
        h(
          "el-form-item",
          {
            props: getFieldProps(schema, path),
            key: path,
            style: {
              width:
                schema.width || parentSchema.fieldSpan || root.fieldMaxWidth,
            },
          },
          [context.scopedSlots.default()]
        ),
      ]
    );
  },
};
</script>
<style lang="css" scoped></style>
