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
    menuName: "学校管理",
    path: "/school",
  },
  {
    menuName: "角色管理",
    path: "/role",
  },
  {
    menuName: "用户管理",
    path: "/user",
  },
  {
    menuName: "班级管理",
    path: "/class",
  },
  {
    menuName: "成绩管理",
    path: "/grades",
  },
  {
    menuName: "历史管理",
    path: "/history",
  },
]);
const studentMenuData = reactive([
  {
    menuName: "个人信息",
    path: "/personal-information",
    icon: "location",
  },
  {
    menuName: "志愿填报",
    path: "/volunteer-basis",
    icon: "location",
  },
  {
    menuName: "个人综测查看",
    path: "/student-comprehensive-assessment",
    icon: "location",
  },
  {
    menuName: "综合测评公示",
    path: "/comprehensive-assessment-check2",
    icon: "location",
  },
  {
    menuName: "查询排名",
    path: "/ranking-query",
    icon: "location",
  },
]);
const headteacherMenuData = reactive([
  {
    menuName: "个人信息",
    path: "/personal-information",
    icon: "location",
  },
  {
    menuName: "本班班级管理",
    path: "/student",
    icon: "location",
  },
  {
    menuName: "综合测评情况",
    path: "/comprehensive-assessment-check",
    icon: "location",
  },
]);
const evaluatorMenuData = reactive([
  {
    menuName: "个人信息",
    path: "/personal-information",
    icon: "location",
  },
  {
    menuName: "综合测评编辑",
    path: "/comprehensive-assessment",
    icon: "location",
  },
]);

const giveMenu = (role) => {
  switch (role) {
    case "0":
      return studentMenuData;
    case "1":
      return teacherMenuData;
    case "2":
      return evaluatorMenuData;
    case "3":
      return headteacherMenuData;
    case "4":
      return managerMenuData;
  }
};

export { giveMenu };
