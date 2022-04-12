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

/**
 * 处理slot
 */
handleFields.register("slot", function (options) {
  if (!options.key) {
    options.key = options.name;
  }
});

/**
 * 处理slot-single
 */
handleFields.register("slot-single", function (options) {
  if (!options.key) {
    options.key = options.name;
  }
});

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

export const getAllFields = (fields, globalOption = {}, updateField = {}) => {
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
      key,
      name,
      nextRowFirst,
      currentRowLast,
      hidden,
      label,
    };
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
      key,
      name,
      nextRowFirst,
      currentRowLast,
      hidden,
      label,
    };
  });
};
