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
    icon: "house",
  },
  {
    menuName: "角色管理",
    path: "/role",
    icon: "location",
  },
  {
    menuName: "用户管理",
    path: "/user",
    icon: "location",
  },
  {
    menuName: "班级管理",
    path: "/class",
    icon: "location",
  },
  {
    menuName: "成绩管理",
    path: "/grades",
    icon: "location",
  },
  {
    menuName: "历史管理",
    path: "/history",
    icon: "location",
  },
]);
const studentMenuData = reactive([
  //以下页面需要做手机自适应
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
  // {
  //   menuName: "综合测评公示",
  //   path: "/comprehensive-assessment-check",
  //   icon: "location",
  // },
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
    menuName: "志愿填报情况",
    path: "/volunteer",
    icon: "location",
  },
  {
    menuName: "综合测评情况",
    path: "/comprehensive-assessment-check",
    icon: "location",
  },
]);
const teacherMenuData = reactive([
  {
    menuName: "个人信息",
    path: "/personal-information",
    icon: "location",
  },
  {
    menuName: "志愿填报情况",
    path: "/volunteer",
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
    menuName: "综合测评公示",
    path: "/comprehensive-assessment-check",
    icon: "location",
  },
  {
    menuName: "综合测评编辑",
    path: "/comprehensive-assessment",
    icon: "location",
  },
]);

const giveMenu = (role) => {
  if (role == -1) {// 超管
    return managerMenuData;
  } else if (role == 0) {
    return studentMenuData;
  } else if (role == 3) {
    return headteacherMenuData;
  } else if (role == 1) {
    return teacherMenuData;
  } else if (role == 2) {
    return evaluatorMenuData;
  }
  return managerMenuData;
};

export { giveMenu };
