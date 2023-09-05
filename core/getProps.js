export function getFieldProps(schema, path) {
  const { title, rules } = schema;

  return {
    label: title,
    rules,
    prop: path,
  };
}

export default function getProps(schema, filter = ["widget", "rules"]) {
  /**
   * 配置项优先级：
   * props > schema > default
   */
  // 获取组件的默认配置
  const { props = {}, ...reset } = schema;

  const defaultProps = {
    placeholder: `请输入${schema.title}`,
  };

  Object.keys({ ...reset, ...defaultProps }).forEach((key) => {
    if (!filter.includes(key) && !props[key]) {
      props[key] = reset[key] || defaultProps[key];
    }
  });

  return props;
}
