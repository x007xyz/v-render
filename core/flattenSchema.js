import { _cloneDeep, isObjType, isListType } from "./utils";
import sortProperties from "./sortProperties";

export const getKeyFromPath = (path = "#") => {
  try {
    const arr = path.split(".");
    const last = arr.slice(-1)[0];
    const result = last.replace("[]", "");
    return result;
  } catch (error) {
    console.error(error, "getKeyFromPath");
    return "";
  }
};

export function getParentSchemaFromFlatten(flatten, path = "#") {
  const arr = path.split(".");
  arr.pop();
  return getSchemaFromFlatten(flatten, arr.join("."));
}

export function getSchemaFromFlatten(flatten, path = "#") {
  let schema = {};
  // 对路径进行处理，去掉数组索引
  path = path.replace(/\[\d+\]/, "");
  const item = _cloneDeep(flatten[path]);

  if (!item) {
    return schema;
  }

  schema = item.schema;
  schema.$id && delete schema.$id;
  if (item.children.length > 0) {
    item.children.forEach((child) => {
      if (!flatten[child]) return;
      const key = getKeyFromPath(child);
      if (isObjType(schema)) {
        schema.properties[key] = getSchemaFromFlatten(flatten, child);
      }
      if (isListType(schema)) {
        schema.items.properties[key] = getSchemaFromFlatten(flatten, child);
      }
    });
  }

  return schema;
}

// TODO: more tests to make sure weird & wrong schema won't crush
export function flattenSchema(_schema = {}, name, parent, _result) {
  // 排序
  // _schema = orderBy(_schema, item => item.order, ['asc']);

  const result = _result || {};

  const schema = _cloneDeep(_schema) || {};
  let _name = name || "#";
  if (!schema.$id) {
    schema.$id = _name; // path as $id, for easy access to path in schema
  }
  const children = [];
  if (isObjType(schema)) {
    sortProperties(Object.entries(schema.properties)).forEach(
      ([key, value]) => {
        // 没有必要对数组的key添加[]，因为在schema中已经有type: array
        // const _key = isListType(value) ? key + "[]" : key;
        const _key = key;
        const uniqueName = _name === "#" ? _key : _name + "." + _key;
        children.push(uniqueName);

        flattenSchema(value, uniqueName, _name, result);
      }
    );

    schema.properties = {};
  }
  if (isListType(schema)) {
    sortProperties(Object.entries(schema.items.properties)).forEach(
      ([key, value]) => {
        // const _key = isListType(value) ? key + "[]" : key;
        const _key = key;
        const uniqueName = _name === "#" ? _key : _name + "." + _key;
        children.push(uniqueName);
        flattenSchema(value, uniqueName, _name, result);
      }
    );

    schema.items.properties = {};
  }

  if (schema.type) {
    result[_name] = { parent, schema, children };
  }

  return result;
}
