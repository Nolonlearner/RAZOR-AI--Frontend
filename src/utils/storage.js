// utils/storage.js
const Storage = {
  set(key, value, ttl = 3600000) {
    // 默认过期时间为 1 小时
    const data = {
      value,
      expiry: ttl ? Date.now() + ttl : null, // 计算过期时间
    };
    localStorage.setItem(key, JSON.stringify(data));
  },
  get(key) {
    const dataStr = localStorage.getItem(key);
    if (!dataStr) return null;
    try {
      const data = JSON.parse(dataStr); // 尝试解析为 JSON
      if (data.expiry && Date.now() > data.expiry) {
        localStorage.removeItem(key); // 清除过期数据
        return null;
      }
      return data.value;
    } catch (error) {
      // 如果解析失败，直接返回原始字符串
      console.warn(
        `Warning: Value for key "${key}" is not JSON. Returning raw value.`
      );
      return dataStr;
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};

export default Storage;
