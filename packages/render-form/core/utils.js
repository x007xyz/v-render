export const getPropByPath = (obj, path) => {
  try {
    // 处理路径
    path = path.replace(/\[(\w+)\]/g, ".$1");
    path = path.replace(/^\./, "");
    const paths = path.split(".");
    let current = obj;
    paths.forEach((p) => {
      current = current[p];
    });
    return current;
  } catch (error) {
    throw new Error(`通过prop获取值失败，请检查路径${path}是否正确`);
  }
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
