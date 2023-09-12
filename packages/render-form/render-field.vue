<script>
import { isObjType, isListType } from "../../core/utils";
import FieldItem from "./field-item.vue";
import FieldList from "./field-list.vue";
import FieldObject from "./field-object.vue";

import { getFieldProps } from "../../core/getProps";
import { getParentSchemaFromFlatten } from "../../core/flattenSchema";
export default {
  name: "render-field",
  functional: true,
  props: {
    path: String,
    schema: Object,
  },
  inject: ["root"],
  render(h, context) {
    const { schema, path } = context.props;

    const root = context.injections.root;

    const parentSchema = getParentSchemaFromFlatten(root.flattenSchema, path);

    if (isObjType(schema)) {
      return h(
        "el-col",
        {
          props: {
            span: schema.span || parentSchema.span || root.fieldSpan,
          },
        },
        [
          h(FieldObject, {
            props: {
              path,
              schema: schema,
            },
          }),
        ]
      );
    }
    if (isListType(schema)) {
      return h(FieldList, {
        props: {
          path,
          schema: schema,
        },
      });
    }
    return h(
      "el-col",
      {
        props: {
          span: schema.span || parentSchema.span || root.fieldSpan,
        },
      },
      [
        schema.noField
          ? h(FieldItem, {
              props: {
                path,
                schema: schema,
              },
            })
          : h(
              "el-form-item",
              {
                props: getFieldProps(schema, path),
                key: path,
                style: {
                  width:
                    schema.width ||
                    parentSchema.fieldSpan ||
                    root.fieldMaxWidth,
                },
              },
              [
                h(FieldItem, {
                  props: {
                    path,
                    schema: schema,
                  },
                }),
              ]
            ),
      ]
    );
  },
};
</script>
<style lang="css" scoped></style>
