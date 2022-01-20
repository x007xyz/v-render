// 内置格式化方法
export const formatters = {};

const columnAttrs = [
  "type",
  "index",
  "column-key",
  "label",
  "prop",
  "width",
  "min-width",
  "fixed",
  "render-header",
  "sortable",
  "sort-method",
  "sort-by",
  "sort-orders",
  "resizable",
  "show-overflow-tooltip",
  "align",
  "header-align",
  "class-name",
  "label-class-name",
  "selectable",
  "reserve-selection",
  "filters",
  "filter-placement",
  "filter-multiple",
  "filter-method",
  "filtered-value",
];

/**
 * 处理Element组件原有的Table-column Attributes
 */
export const getColumnAttr = (schema) => {
  let attr = {};
  Object.keys(schema).forEach((key) => {
    if (schema.key) {
      schema.prop = schema.key;
    }
    if (columnAttrs.includes(key)) {
      attr[key] = schema[key];
    }
    // 单独处理formatter
    if (key === "formatter") {
      // 如果formatter的类型为string则认为formatter使用默认的format
      // 否则则认为是一个函数
      if (typeof schema[key] === "string") {
        const prop = schema.prop;
        const fnName = schema[key];
        attr[key] = (row) => formatters[fnName](row[prop], row);
      } else {
        attr[key] = schema[key];
      }
    }
  });
  return attr;
};
