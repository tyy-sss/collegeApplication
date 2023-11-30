/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-27 20:45:21
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-11-27 21:02:11
 * @FilePath: \collegeApplication\src\assets\js\data\menu.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { reactive } from "vue";

// 模拟菜单数据
/**
 * id：唯一标识
 * menuType：菜单是几级菜单
 * menuName：菜单名字
 * path：路径
 * icon：展示图标
 */
const managerMenuData = reactive([
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
const menuData = reactive([
  {
    id: "788d4075e218daaf4ec77e31",
    menuType: "1",
    menuName: "个人信息",
    path: "/personal-information",
    icon: "location",
  },
  {
    id: "600d4075e218daaf4ec77e22",
    menuType: "1",
    menuName: "班级管理",
    path: "/student",
    icon: "location",
  },
  {
    id: "789d4075e218daaf4ec77e31",
    menuType: "1",
    menuName: "志愿查看",
    path: "/volunteer-check",
    icon: "location",
  },
  {
    id: "789d4075e218daaf4ec77e32",
    menuType: "1",
    menuName: "志愿填报",
    path: "/volunteer-fill",
    icon: "location",
  },
  {
    id: "758d7075e218daaf4ec77e33",
    menuType: "1",
    menuName: "个人综测查看",
    path: "/student-comprehensive-assessment",
    icon: "location",
  },
  {
    id: "758d7075e218daaf4ec77e31",
    menuType: "1",
    menuName: "综合测评公示",
    path: "/comprehensive-assessment-check",
    icon: "location",
  },
  {
    id: "600d4075e218daaf4ec77e31",
    menuType: "1",
    menuName: "综合测评编辑",
    path: "/comprehensive-assessment",
    icon: "location",
  },
  {
    id: "758d7075e218daaf4ec77e38",
    menuType: "1",
    menuName: "查询排名",
    path: "/ranking-query",
    icon: "location",
  },
]);

const giveMenu = (role) => {
  if (role === "manager") {
    return managerMenuData;
  } else if (role === "student") {
  } else if (role === "teacher") {
  }
  return managerMenuData;
};

export { giveMenu };
