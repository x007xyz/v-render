export class Storage {
  storage = null
  constructor (storage) {
    this.storage = storage
  }
  setItem (key, value, expire) {
    const valueType = typeof value
    const item = {
      type: valueType,
      data: value
    }
    if (expire) {
      item.expire = Date.now() + expire * 1000
    }
    this.storage.setItem(key, JSON.stringify(item))
  }
  getItem (key) {
    const ret = this.storage.getItem(key)
    try {
      const item = JSON.parse(ret)
      // 过期时间不存在或者过期时间存在，并且没有过期
      if (!item.expire || (item.expire && item.expire >= Date.now())) {
        return item.data
      }
      if (item.expire && item.expire < Date.now()) {
        console.log(`${key}已过期`)
      }
      return null
    } catch (error) {
      console.log('error', error)
      return ret
    }
  }
  removeItem (key) {
    this.storage.removeItem(key)
  }
  clear () {
    this.storage.clear()
  }
}

export const lStorage = new Storage(localStorage)
export const sStorage = new Storage(sessionStorage)

export const getCache = (key) => {
  return lStorage.getItem(key) || sStorage.getItem(key)
}

export const setCache = (key, value, cache) => {
  (cache.type === 'session' ? sStorage : lStorage).setItem(key, value, cache.expire)
}
