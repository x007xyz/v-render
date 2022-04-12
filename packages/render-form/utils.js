class HandleField {
  handler = {};
  register(key, option) {
    this.handler[key] = option;
  }
  format(key, options) {
    if (key in this.handler) {
      this.handler[key](options);
    }
  }
}

export const handleFields = new HandleField();

// 获取完整的fields，合并了默认值，全局设置
export const getAllBlocks = (fields, globalOption) => {
  const { borderForm } = globalOption;
  return fields.map((block) => {
    const res = {};
    // 填充block.class
    if (block.class) {
      res.class = { ...block.class, "block-item": borderForm };
    } else {
      res.class = { "block-item": borderForm };
    }
    // 填充block.id
    if (!block.id) {
      res.id = block.label;
    }
    res.children = (block.children || []).map((field) => ({
      prop: field.key || field.name,
      comp: field.type,
    }));
    return res;
  });
};

export const getFieldOptions = (fields, globalOption) => {
  const { allDisabled, textModel, formItemCol, formItemSize } = globalOption;
  return fields.map((field) => {
    // 获取完整的参数
    let fieldOptions = {
      defaultValue: "",
      type: "normal-input",
      span: Number(formItemCol),
      disabled: !!allDisabled,
      textModel: !!textModel,
      size: formItemSize,
      ...field,
    };
    // 根据组件类型处理数据
    handleFields.format(fieldOptions.type, fieldOptions);
    // 将组件的值都放到_props中
    const {
      defaultValue,
      type,
      span,
      rules,
      key,
      label,
      name,
      size,
      nextRowFirst,
      currentRowLast,
      hidden,
      props,
      ...other
    } = fieldOptions;
    return {
      props: { ...other, ...props, style: { width: size } },
      defaultValue,
      comp: type,
      span,
      rules,
      key: key || name,
      name,
      nextRowFirst,
      currentRowLast,
      hidden,
      label,
    };
  });
};
