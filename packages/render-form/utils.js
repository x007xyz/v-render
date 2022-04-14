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
      key: field.key || field.name,
      widget: field.type,
    }));
    return res;
  });
};
/**
 * 处理之前版本的数据
 * @param {*} option
 */
const handleOldOption = ({ type, ...other }) => {
  // 将原本版本的type转换为widget
  const widget = type || "normal-input";
  // 根据type设置新的type
  return {
    widget,
    type: widget.toLowerCase().includes("list") ? "array" : "string",
    ...other,
  };
};

const handleField = (option, globalOption) => {
  const { type, widget, fields, ...field } = handleOldOption(option);
  const {
    allDisabled, // 是否禁用所有
    textModel, // 是否是文本模式
    formItemCol, // 字段的col
    formItemSize, // 字段的size
  } = globalOption;

  // 处理字段列表
  // 设置widget
  // 获取完整的参数
  let fieldOption = {
    defaultValue: "",
    widget: widget || "normal-input",
    type: type || "string",
    span: Number(formItemCol),
    disabled: !!allDisabled,
    textModel: !!textModel,
    size: formItemSize,
    ...field,
  };
  // 根据组件类型处理数据
  handleFields.format(fieldOption.widget, fieldOption);
  if (fields && fields.length > 0) {
    let tempObj = null;
    // 如果fields存在则根据type设置properties/items
    if (fieldOption.type === "array") {
      tempObj = fieldOption.items = {};
    } else {
      tempObj = fieldOption.properties = {};
    }
    fields.forEach((item) => {
      tempObj[item.key] = handleField(item, globalOption);
    });
  }
  // 将组件的值都放到_props中
  return fieldOption;
};
/**
 * 生成字段配置信息
 * @param {*} blocks
 * @param {*} globalOption
 * @returns
 */
export const generateFieldOption = (blocks, globalOption) => {
  const fieldOption = {};
  // 获取字段列表
  blocks
    .reduce((result, block) => result.concat(block.children), [])
    .forEach((field) => {
      fieldOption[field.key || field.name] = handleField(field, globalOption);
    });
  return fieldOption;
};
/**
 * 根据fieldOption生成完整的表单数据
 * @param {*} fieldOption
 */
export const generateFormDate = (fieldOption) => {
  const formData = {};
  Object.keys(fieldOption).forEach((key) => {
    if (fieldOption[key].items) {
      setPropByPath(formData, key, [generateFormDate(fieldOption[key].items)]);
    } else if (fieldOption[key].properties) {
      setPropByPath(
        formData,
        key,
        generateFormDate(fieldOption[key].properties)
      );
    } else {
      setPropByPath(formData, key, fieldOption[key].defaultValue);
    }
  });
  return formData;
};
/**
 * 通过path设置属性
 */
const setPropByPath = (obj, path, value) => {
  // 处理路径
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");
  let tempObj = obj;
  const paths = path.split(".");
  const key = paths.pop();
  for (let i = 0; i < paths.length; i++) {
    if (tempObj[paths[i]] === undefined) {
      tempObj[paths[i]] = {};
    }
    tempObj = tempObj[paths[i]];
  }
  tempObj[key] = value;
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
