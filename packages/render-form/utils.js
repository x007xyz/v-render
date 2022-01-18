// 对一个 block 下的要素，进行 el-row 的分行
export const getFieldRow = (fields) => {
  // 返回值是一个二维数组，每一个数组是el-row的一行
  const list = [[]];
  if (!fields) {
    return list;
  }
  fields.forEach((field) => {
    // field.span 字段占有多少span
    // field.nextRowFirst 另起一行
    if (field.nextRowFirst) {
      // 直接插入一个新数组
      list.push([field]);
    } else {
      // 不是field.currentRowLast，计算现有的span加上需要field的span是否大于24
      const curRow = list[list.length - 1];
      const curSpanNum = curRow.reduce((r, item) => {
        return r + item.span;
      }, 0);
      if (curSpanNum + field.span > 24) {
        // 另起一行
        list.push([field]);
      } else {
        // 插入当前行
        curRow.push(field);
      }
      // field.currentRowLast 下一个字段另起一行
      if (field.currentRowLast) {
        list.push([]);
      }
    }
  });
  return list;
};
// 获取完整的fields，合并了默认值，全局设置
export const getAllBlocks = (fields, globalOption, updateField = {}) => {
  const { borderForm } = globalOption;
  return fields.map((block) => {
    // TODO: 填充block的值
    // 填充block.class
    if (block.class) {
      block.class = { ...block.class, "block-item": borderForm };
    } else {
      block.class = { "block-item": borderForm };
    }
    // 填充block.id
    if (!block.id) {
      block.id = block.label;
    }
    if (!Array.isArray(block.children)) {
      block.children = [];
    } else {
      block.children = getAllFields(block.children, globalOption, updateField);
    }
    return block;
  });
};

export const getAllFields = (fields, globalOption = {}, updateField = {}) => {
  const { allDisabled, textModel, formItemCol } = globalOption;
  return fields.map((field) => {
    // 获取完整的参数
    let fieldOptions = {
      defaultValue: "",
      type: "input",
      span: formItemCol,
      disabled: !!allDisabled,
      textModel: !!textModel,
      ...field,
    };
    // 根据组件类型处理数据
    if (fieldOptions.type === "checkbox") {
      if (fieldOptions.defaultValue === "") {
        fieldOptions.defaultValue = [];
      }
    }
    if (fieldOptions.type === "switch") {
      if (fieldOptions.defaultValue === "") {
        fieldOptions.defaultValue = false;
      }
    }
    // 使用updateField覆盖fieldOptions，获取最后的值
    if (updateField[fieldOptions.key]) {
      fieldOptions = { ...fieldOptions, ...updateField[fieldOptions.key] };
    }
    // 将组件的值都放到_props中
    const {
      defaultValue,
      type,
      span,
      rules,
      key,
      label,
      name,
      nextRowFirst,
      currentRowLast,
      hidden,
      props,
      ...other
    } = fieldOptions;
    return {
      props: { ...other, ...props },
      defaultValue,
      type,
      span,
      rules,
      key,
      name,
      nextRowFirst,
      currentRowLast,
      hidden,
      label,
    };
  });
};
