import { _cloneDeep, isObjType, isListType } from "./utils";

export const createDataSkeleton = (schema, formData) => {
  let _formData = _cloneDeep(formData);
  let result = _formData;

  if (isObjType(schema)) {
    if (_formData === undefined || typeof _formData !== "object") {
      _formData = {};
      result = {};
    }
    schema.properties.forEach((item) => {
      const childSchema = item;
      const childData = _formData[item.key];
      const childResult = createDataSkeleton(childSchema, childData);
      result[item.key] = childResult;
    });
  } else if (_formData !== undefined) {
    // result = _formData;
  } else if (schema.default !== undefined) {
    result = _cloneDeep(schema.default);
  } else if (isListType(schema)) {
    result = [createDataSkeleton(schema.items)];
  } else if (schema.type === "array") {
    result = [];
  } else if (schema.type === "boolean" && !schema.widget) {
    // result = false;
    result = undefined;
  } else {
    result = undefined;
  }
  return result;
};
