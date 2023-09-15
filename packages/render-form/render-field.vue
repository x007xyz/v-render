<script>
import { isObjType, isListType } from "../../core/utils";
import FieldItem from "./field-item.vue";
import FieldList from "./field-list.vue";
import FieldObject from "./field-object.vue";
import VCol from "./v-col.vue";

import { parseAllExpression } from "../../core/expression";

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

    const newSchema = parseAllExpression(
      schema,
      root.getValues(),
      path.split(".").slice(0, -1).join("."), // 获取父级路径，TODO：存在问题，需要优化
      root.rootSchema
    );

    if (newSchema.hidden) {
      return null;
    }

    if (isObjType(schema)) {
      return h(
        VCol,
        {
          props: {
            span: newSchema.span || parentSchema.span,
            column: parentSchema.column || root.rootSchema.column,
          },
        },
        [
          h(FieldObject, {
            props: {
              path,
              schema: newSchema,
            },
          }),
        ]
      );
    }
    if (isListType(schema)) {
      return h(FieldList, {
        props: {
          path,
          schema: newSchema,
        },
      });
    }
    return h(
      VCol,
      {
        props: {
          span: newSchema.span || parentSchema.span,
          column: parentSchema.column || root.rootSchema.column,
        },
      },
      [
        schema.noField
          ? h(FieldItem, {
              props: {
                path,
                schema: newSchema,
              },
            })
          : h(
              "el-form-item",
              {
                props: getFieldProps(newSchema, path),
                key: path,
                style: {
                  width:
                    newSchema.width ||
                    parentSchema.fieldSpan ||
                    root.fieldMaxWidth,
                },
              },
              [
                h(FieldItem, {
                  props: {
                    path,
                    schema: newSchema,
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
