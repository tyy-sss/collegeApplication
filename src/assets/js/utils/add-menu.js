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
