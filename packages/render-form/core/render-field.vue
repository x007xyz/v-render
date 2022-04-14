<script>
import { toCompProps, getFieldProps } from "./utils";
export default {
  name: "render-field",
  functional: true,
  inject: ["mainForm"],
  props: {
    // 字段的prop，会根据prop的值来获取相关的属性
    prop: String,
  },
  render(h, { props, parent, injections }) {
    const { prop } = props;
    if (prop) {
      // 通过prop获取字段的属性
      const { fieldOption } = parent;
      // 获取主表单的slots
      const { $slots: slots } = injections["mainForm"];
      const fieldProps = getFieldProps(fieldOption, prop);
      const props = toCompProps(prop, parent);
      if (fieldProps.hidden) return;
      return (
        <el-col span={fieldProps.span}>
          {fieldProps.widget === "slot-single" ? (
            slots[prop]
          ) : (
            <el-form-item
              rules={fieldProps.rules}
              label={fieldProps.label ? fieldProps.label + ":" : " "}
              prop={prop}
            >
              {fieldProps.widget === "slot" ? (
                slots[prop]
              ) : (
                <fieldProps.widget {...props}></fieldProps.widget>
              )}
            </el-form-item>
          )}
        </el-col>
      );
    }
    return <div>prop不存在</div>;
  },
};
</script>
