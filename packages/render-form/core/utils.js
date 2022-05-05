import get from "lodash.get";
// export const getPropByPath = (obj, path) => {
//   try {
//     // 处理路径
//     path = path.replace(/\[(\w+)\]/g, ".$1");
//     path = path.replace(/^\./, "");
//     const paths = path.split(".");
//     let current = obj;
//     paths.forEach((p) => {
//       current = current[p];
//     });
//     return current;
//   } catch (error) {
//     console.log(obj, path);
//     throw new Error(`获取通过prop获取的值失败，请检查路径${path}是否正确`);
//   }
// };
// 获取字段的相关属性
export const getFieldProps = (fieldOption, key) => {
  const { span, widget, rules, label, hidden, type } = get(fieldOption, key);
  return { span, widget, rules, label, hidden, type };
};
/**
 * 获取组件的相关属性
 * @param {*} fieldOption
 * @param {*} key
 * @returns
 */
export const getCompProps = (fieldOption, key) => {
  // eslint-disable-next-line no-unused-vars
  const { span, widget, rules, label, hidden, type, ...other } = get(
    fieldOption,
    key
  );
  return other;
};
/**
 * 将配置项转换为字段组件的配置
 * 完整的配置如下（https://cn.vuejs.org/v2/guide/render-function.html#%E5%AE%8C%E6%95%B4%E7%A4%BA%E4%BE%8B）：
 {
  // 与 `v-bind:class` 的 API 相同，
  // 接受一个字符串、对象或字符串和对象组成的数组
  'class': {
    foo: true,
    bar: false
  },
  // 与 `v-bind:style` 的 API 相同，
  // 接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML attribute
  attrs: {
    id: 'foo'
  },
  // 组件 prop
  props: {
    myProp: 'bar'
  },
  // DOM property
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器在 `on` 内，
  // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
  // 需要在处理函数中手动检查 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽的格式为
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其它特殊顶层 property
  key: 'myKey',
  ref: 'myRef',
  // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
}
 */
export const toCompProps = (
  key,
  { formData, updateValue, fieldOption, path: parentPath }
) => {
  const value = get(formData, key);
  const {
    disabled,
    size,
    readOnly,
    className,
    style,
    options,
    events = {},
    props,
    ...other
  } = getCompProps(fieldOption, key);
  const _props = {
    disabled,
    readOnly,
    options,
    ...props,
    ...other,
    path: parentPath ? `${parentPath}.${key}` : key,
  };
  // 处理事件
  const on = {
    ...events,
    input: (value) => {
      updateValue(key, value);
      events.input && events.input(value);
    },
  };
  return {
    on,
    style: {
      width: size,
      ...style,
    },
    props: {
      value,
      ..._props,
    },
    attrs: {
      value,
      ..._props,
    },
    class: className || "",
  };
};

export function hasPropByPath(obj, path) {
  try {
    // 处理路径
    path = path.replace(/\[(\w+)\]/g, ".$1");
    path = path.replace(/^\./, "");
    const paths = path.split(".");
    let tempObj = obj;
    return paths.every((key) => {
      if (tempObj && key in tempObj) {
        tempObj = tempObj[key];
        return true;
      }
    });
  } catch (error) {
    console.log("路径有误");
    return false;
  }
}
