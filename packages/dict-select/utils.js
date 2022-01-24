export class Storage {
  storage = null;
  constructor(storage) {
    this.storage = storage;
  }
  setItem(key, value, expire) {
    const valueType = typeof value;
    const item = {
      type: valueType,
      data: value,
    };
    if (expire) {
      item.expire = Date.now() + expire * 1000;
    }
    this.storage.setItem(key, JSON.stringify(item));
  }
  getItem(key) {
    const ret = this.storage.getItem(key);
    if (!ret) {
      return ret;
    }
    try {
      const item = JSON.parse(ret);
      // 过期时间不存在或者过期时间存在，并且没有过期
      if (!item.expire || (item.expire && item.expire >= Date.now())) {
        return item.data;
      }
      if (item.expire && item.expire < Date.now()) {
        console.log(`${key}已过期`);
      }
      return null;
    } catch (error) {
      console.log("error", error);
      return ret;
    }
  }
  removeItem(key) {
    this.storage.removeItem(key);
  }
  clear() {
    this.storage.clear();
  }
}

export const lStorage = new Storage(window.localStorage);
export const sStorage = new Storage(window.sessionStorage);

export const getCache = (key) => {
  return lStorage.getItem(key) || sStorage.getItem(key);
};

export const setCache = (key, value, cache) => {
  (cache.type === "session" ? sStorage : lStorage).setItem(
    key,
    value,
    cache.expire
  );
};

export const getDictData = (key, dictFn, cache) => {
  if (key) {
    // 先查询缓存是否有数据
    const data = getCache("dictCache-" + key);
    if (data) {
      return Promise.resolve(data);
    }
  }
  return dictFn().then((data) => {
    // data不为空数组，dictName存在，并且设置了缓存时，对获取的数据进行缓存
    if (data.length && key && cache) {
      setCache("dictCache-" + key, data, cache);
    }
    return data;
  });
};
