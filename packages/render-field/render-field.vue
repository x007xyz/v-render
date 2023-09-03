<script>
import RenderList from "../render-list/render-list.vue";
export default {
  name: "render-item",
  functional: true,
  props: {
    parentPath: String,
    schema: Object,
  },
  inject: ["root"],
  render(h, context) {
    const { schema } = context.props;
    console.log("🚀 ~ file: render-field.vue:10 ~ render ~ context:", context);
    const { rules = [], label, key } = context.props.schema;

    const root = context.injections.root;
    console.log("🚀 ~ file: render-field.vue:15 ~ render ~ root:", root);
    const { type, props } = context.props.schema;
    const path = [context.props.parentPath, key].filter(Boolean).join(".");
    const wrapper = () =>
      h(
        type,
        {
          props: {
            value: root.getValueByPath(path),
            ...props,
          },
          attrs: {
            ...props,
          },
          on: {
            input(e) {
              root.setValueByPath(e, path);
            },
          },
        },
        context.children
      );

    function renderWidget() {
      console.log(
        "🚀 ~ file: render-field.vue:44 ~ renderWidget ~ type:",
        type
      );
      if (type === "slot") {
        return root.$scopedSlots[schema.name]();
      } else if (type === "child-form") {
        console.log("schema", schema);
        return h(RenderList, {
          props: {
            parentPath: path,
            schema: schema.props.fields,
          },
        });
      } else {
        return wrapper();
      }
    }
    return h(
      "el-form-item",
      {
        props: {
          label,
          prop: path,
          rules,
        },
      },
      [renderWidget()]
    );
  },
};
</script>
<style lang="css" scoped></style>
