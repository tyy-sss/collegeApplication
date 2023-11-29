import router from "@/router";

// 处理从后端传过来的path数据
const getComponent = (path) => {
  path = path.replace(path[0], path[0].toUpperCase());
  var pos = path.indexOf("-");
  while (pos > -1) {
    path = path.replace(path[pos + 1], path[pos + 1].toUpperCase());
    pos = path.indexOf("-", pos + 1);
  }
  return path.replace(new RegExp("-", "g"), ""); // 去除'-'
};

// 动态注册路由
const addMenu = (data) => {
  // 处理动态路由的数据
  const menuData = JSON.parse(JSON.stringify(data));
  const menuArray = [];
  menuData.forEach((item) => {
    menuArray.push(item);
  });
};
export { addMenu };
