<script>
import RenderField from "./render-field.vue";
import { createDataSkeleton } from "../../core/genData4Schema";
export default {
  name: "field-list",
  functional: true,
  props: {
    path: String,
    schema: Object,
  },
  inject: ["root"],
  render(h, context) {
    const { path, schema } = context.props;
    console.log("🚀 ~ file: field-list.vue:11 ~ context:", path, schema);
    const root = context.injections.root;
    const values = root.getValueByPath(path);
    console.log("🚀 ~ file: field-list.vue:17 ~ render ~ values:", values);
    const handleNew = (event) => {
      event.preventDefault();
      root.setValueByPath(
        values.concat([createDataSkeleton(schema.items)]),
        path
      );
    };
    const handleRemove = (event) => {
      event.preventDefault();
      root.setValueByPath(values.slice(0, -1), path);
    };
    return h(
      "div",
      { class: "box", key: path },
      values
        .reduce((r, _, index) => {
          return r.concat(
            Object.entries(schema.items.properties).map(([key, value]) => {
              return h(RenderField, {
                props: {
                  path: [path + `[${index}]`, key].filter(Boolean).join("."),
                  schema: value,
                },
              });
            })
          );
        }, [])
        .concat([
          h(
            "button",
            {
              on: {
                click: handleNew,
              },
            },
            "add"
          ),
          h(
            "button",
            {
              on: {
                click: handleRemove,
              },
            },
            "remove"
          ),
        ])
    );
  },
};
</script>
<style lang="css" scoped></style>
