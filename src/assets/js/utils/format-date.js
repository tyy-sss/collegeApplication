//将数字或者中国标准时间变成yyy-MM-dd HH-MM-SS格式的日期
const formatDate = (value) => {
  let date = new Date(value);
  let y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    i = date.getMinutes(),
    s = date.getSeconds();
  if (m < 10) {
    m = "0" + m;
  }
  if (d < 10) {
    d = "0" + d;
  }
  if (h < 10) {
    h = "0" + h;
  }
  if (i < 10) {
    i = "0" + i;
  }
  if (s < 10) {
    s = "0" + s;
  }
  let t = y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
  return t;
};
export { formatDate };
