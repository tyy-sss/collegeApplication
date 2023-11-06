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
    id: "600d4075e218daaf4ec77e31",
    menuType: "1",
    menuName: "历史管理",
    path: "/history",
    icon: "location",
  },
  {
    id: "700d4075e218daaf4ec77e31",
    menuType: "1",
    menuName: "规则管理",
    path: "/rule",
    icon: "location",
  },
  {
    id: "700d4075e218daaf4ec77e01",
    menuType: "1",
    menuName: "信息中心",
    path: "/information",
    icon: "location",
  },
  // {
  //   id: "780d4075e218daaf4ec77e31",
  //   menuType: "1",
  //   menuName: "学生管理",
  //   path: "/student",
  //   icon: "location",
  // },
  // {
  //   id: "789d4075e218daaf4ec77e31",
  //   menuType: "1",
  //   menuName: "志愿查看",
  //   path: "/volunteer-check",
  //   icon: "location",
  // },
  // {
  //   id: "788d4075e218daaf4ec77e31",
  //   menuType: "1",
  //   menuName: "个人信息",
  //   path: "/personal-information",
  //   icon: "location",
  // },
  // {
  //   id: "788d7075e218daaf4ec77e31",
  //   menuType: "1",
  //   menuName: "志愿填报",
  //   path: "/volunteer-fill",
  //   icon: "location",
  // },
  // {
  //   id: "758d7075e218daaf4ec77e31",
  //   menuType: "1",
  //   menuName: "综合测评查看",
  //   path: "/comprehensive-assessment-check",
  //   icon: "location",
  // },
  // {
  //   id: "758d7075e218daaf4ec77e31",
  //   menuType: "1",
  //   menuName: "综合测评编辑",
  //   path: "/comprehensive-assessment",
  //   icon: "location",
  // },
]);

export { menuData };
