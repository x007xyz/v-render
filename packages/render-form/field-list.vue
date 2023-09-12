<script>
import draggable from "vuedraggable";
import RenderField from "./render-field.vue";
import { createDataSkeleton } from "../../core/genData4Schema";
import { getWidgetName, getWidget } from "../../core/getWidgetName";
import { cloneDeep } from "lodash-es";
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
    const root = context.injections.root;
    const widgetName = getWidgetName(schema);
    const widget = getWidget(widgetName, root.widgets);
    const values = root.getValueByPath(path);
    const handleNew = () => {
      root.setValueByPath(
        values.concat([createDataSkeleton(schema.items)]),
        path
      );
    };
    const handleRemove = (index) => {
      const _value = values.slice();
      _value.splice(index, 1);
      root.setValueByPath(_value, path);
    };

    const handleMove = ({ index, step }) => {
      const nextIndex = index + step;
      const _values = values.slice();
      const temp = _values[index];
      _values[index] = _values[nextIndex];
      _values[nextIndex] = temp;
      root.setValueByPath(_values, path);
    };

    const handleCopy = (index) => {
      root.setValueByPath(values.concat([cloneDeep(values[index])]), path);
    };
    return h(widget, {
      key: path,
      on: {
        add: handleNew,
        remove: handleRemove,
        move: handleMove,
        copy: handleCopy,
      },
      props: {
        value: values,
        ...schema,
      },
      scopedSlots: {
        default: (props) => {
          return h(
            draggable,
            {
              props: { list: schema.items.properties },
              attrs: { group: { name: "g1" } },
            },
            schema.items.properties.map(({ key, ...value }) => {
              return h(RenderField, {
                props: {
                  path: [path + `[${props.index}]`, key]
                    .filter(Boolean)
                    .join("."),
                  schema: value,
                },
              });
            })
          );
        },
      },
    });
  },
};
</script>
<style lang="css" scoped></style>
