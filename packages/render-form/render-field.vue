<script>
import { isObjType, isListType } from "../../core/utils";
import FieldItem from "./field-item.vue";
import FieldList from "./field-list.vue";
import FieldObject from "./field-object.vue";
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
    if (isObjType(schema)) {
      return h(FieldObject, {
        props: {
          path,
          schema: schema,
        },
      });
    }
    if (isListType(schema)) {
      return h(FieldList, {
        props: {
          path,
          schema: schema,
        },
      });
    }

    return h(FieldItem, {
      props: {
        path,
        schema: schema,
      },
    });
  },
};
</script>
<style lang="css" scoped></style>
