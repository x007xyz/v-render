<script>
import { getPropByPath } from "./utils";
export default {
  name: "render-field",
  functional: true,
  inject: ["mainForm"],
  props: {
    // 字段的prop，会根据prop的值来获取相关的属性
    prop: String,
  },
  render(h, { props, injections }) {
    const { prop } = props;
    if (prop) {
      // 通过prop获取字段的属性
      const mainForm = injections.mainForm;
      const {
        formData,
        updateValue,
        getFieldOptionByProp,
        $slots: slots,
      } = mainForm;
      const fieldOption = getFieldOptionByProp(prop);
      console.log("fieldOption", fieldOption, mainForm);
      const value = getPropByPath(formData, prop);
      return (
        <el-col span={fieldOption.span}>
          {fieldOption.comp === "slot-single" ? (
            slots[prop]
          ) : (
            <el-form-item
              rules={fieldOption.rules}
              label={fieldOption.label ? fieldOption.label + ":" : " "}
              prop={prop}
            >
              {fieldOption.comp === "slot" ? (
                slots[prop]
              ) : (
                <fieldOption.comp
                  {...{
                    props: {
                      value,
                    },
                    attrs: {
                      ...fieldOption.props,
                    },
                    on: {
                      input: (value) => {
                        updateValue(prop, value);
                      },
                    },
                  }}
                ></fieldOption.comp>
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
<style lang="css" scoped></style>
