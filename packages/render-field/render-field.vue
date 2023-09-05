<script>
import { getWidgetName } from "../../core/getWidgetName";
// import RenderList from "../render-list/render-list.vue";
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
    console.log("🚀 ~ file: render-field.vue:13 ~ render ~ schema:", schema);

    const widget = getWidgetName(schema);

    console.log("🚀 ~ file: render-field.vue:18 ~ render ~ widget:", widget);

    const { rules = [], label, key } = context.props.schema;

    const path = [context.props.parentPath, key].filter(Boolean).join(".");

    const root = context.injections.root;

    const { props } = context.props.schema;

    const renderItem = () => {
      return h(
        "el-form-item",
        {
          props: {
            label,
            prop: path,
            rules,
          },
        },
        [
          h(
            widget,
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
          ),
        ]
      );
    };

    // const renderSlot = () => {
    //   return root.$scopedSlots[schema.name]();
    // };

    // const renderList = () => {
    //   return h(RenderList, {
    //     props: {
    //       parentPath: path,
    //       schema: schema.props.fields,
    //     },
    //   });
    // };

    return renderItem();
  },
};
</script>
<style lang="css" scoped></style>
