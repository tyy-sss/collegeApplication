import { reactive } from "vue";

// 模拟菜单数据
/**
 * id：唯一标识
 * menuType：菜单是几级菜单
 * menuName：菜单名字
 * path：路径
 * icon：展示图标
 */
const menuData = reactive([
  {
    id: "600d4075e218daaf4ec77e50",
    menuType: "1",
    menuName: "学校管理",
    path: "/school",
    icon: "house",
  },
  {
    id: "600d4075e218daaf4ec77e51",
    menuType: "1",
    menuName: "角色管理",
    path: "/role",
    icon: "location",
  },
  {
    id: "600d4075e218daaf4ec77e21",
    menuType: "1",
    menuName: "用户管理",
    path: "/user",
    icon: "location",
  },
  {
    id: "600d4075e218daaf4ec77e22",
    menuType: "1",
    menuName: "班级管理",
    path: "/class",
    icon: "location",
  },
  {
    id: "600d4075e218daaf4ec77e31",
    menuType: "1",
    menuName: "历史管理",
    path: "/history",
    icon: "location",
  },
]);

export { menuData };
