import { isObjType, _cloneDeep, isListType } from "./utils";

function translateSchema(schema) {
  const _schema = _cloneDeep(schema);
  if (isObjType(schema)) {
    const properties = [];
    Object.keys(schema.properties).forEach((key) => {
      properties.push({
        key,
        ...translateSchema(schema.properties[key]),
      });
    });
    _schema.properties = properties;
  }
  if (isListType(schema)) {
    const properties = [];
    Object.keys(schema.items.properties).forEach((key) => {
      properties.push({
        key,
        ...translateSchema(schema.items.properties[key]),
      });
    });
    _schema.items.properties = properties;
  }
  return _schema;
}

export default translateSchema;
