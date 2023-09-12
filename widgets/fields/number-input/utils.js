export const toThousands = (num) => {
  if (num === "") {
    return "";
  }
  const n = String(num);
  const res = n.toString().replace(/\d+/, (n) => {
    return n.replace(/(\d)(?=(\d{3})+$)/g, ($1) => {
      return $1 + ",";
    });
  });
  return res;
};
export const padZore = (num, zeroPadding) => {
  if (!zeroPadding || zeroPadding <= 0) {
    return num;
  }
  let newVal = num;
  const l = String(newVal).split(".");
  // 如果没有小数点（说明只有整数位），自动补零
  if (l.length === 1) {
    // 判断 l[0].length 是否为 0，为 0 则说明没填，啥事都不做
    if (l[0].length === 0) {
      newVal = "";
    } else {
      // 自动补零
      newVal += "." + "0".padEnd(zeroPadding, "0");
    }
  } else {
    // 此时说明有小数点，那么小数位数多，则去掉多余的。位数小，则补零
    const currentLength = l[1].length;
    // 小数位数少，则补零
    if (currentLength < zeroPadding) {
      newVal = l[0] + "." + l[1].padEnd(zeroPadding, "0");
    }
    // 如果大于
    if (currentLength > zeroPadding) {
      newVal = String(l[0]) + "." + l[1].slice(0, zeroPadding);
    }
  }
  return newVal;
};
