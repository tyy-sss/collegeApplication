// 角色权限的信息
import { reactive } from "vue";

const studentTableData = reactive([
  {
    name: "个人信息",
    rule: {
      allRule: ["查看", "修改", "申诉"],
      ruleDetail: ["查看", "修改", "申诉"],
    },
  },
  {
    name: "志愿信息",
    rule: {
      allRule: ["查看", "修改", "导出"],
      ruleDetail: ["查看", "修改"],
    },
  },
  {
    name: "学生个人综测",
    rule: {
      allRule: ["查看", "修改","申诉"],
      ruleDetail: ["查看","申诉"],
    },
  },
  {
    name: "班级综合测评",
    rule: {
      allRule: ["查看", "修改", "导出"],
      ruleDetail: ["查看", "导出"],
    },
  },
  {
    name: "学生查询排名",
    rule: {
      allRule: ["查看", "查询"],
      ruleDetail: ["查看", "查询"],
    },
  },
]);
const teacherTableData = reactive([
  {
    name: "个人信息",
    rule: {
      allRule: ["查看", "修改", "申诉"],
      ruleDetail: ["查看", "修改"],
    },
  },
  {
    name: "志愿信息",
    rule: {
      allRule: ["查看", "修改", "导出"],
      ruleDetail: ["查看"],
    },
  },
]);
const comprehensiveTableData = reactive([
  {
    name: "个人信息",
    rule: {
      allRule: ["查看", "修改", "申诉"],
      ruleDetail: ["查看"],
    },
  },
   {
    name: "学生个人综测",
    rule: {
      allRule: ["查看", "修改","申诉"],
      ruleDetail: ["查看","修改"],
    },
  },
  {
    name: "班级综合测评",
    rule: {
      allRule: ["查看", "修改", "导出"],
      ruleDetail: ["查看", "修改", "导出"],
    },
  },
]);
const headerTeacherTableData = reactive([
  {
    name: "个人信息",
    rule: {
      allRule: ["查看", "修改", "申诉"],
      ruleDetail: ["查看", "修改"],
    },
  },
  {
    name: "志愿信息",
    rule: {
      allRule: ["查看", "修改", "导出"],
      ruleDetail: ["查看"],
    },
  },
   {
    name: "学生个人综测",
    rule: {
      allRule: ["查看", "修改","申诉"],
      ruleDetail: ["查看"],
    },
  },
  {
    name: "班级综合测评",
    rule: {
      allRule: ["查看", "修改", "导出"],
      ruleDetail: ["查看", "导出"],
    },
  },
  {
    name: "班级管理",
    rule: {
      allRule: ["查看", "班级成员管理", "申诉处理", "测评小组分配"],
      ruleDetail: ["查看", "班级成员管理", "申诉处理", "测评小组分配"],
    },
  },
]);
export const getTableDataByRole = (role) => {
  console.log(role);
  switch (role) {
    case "学生":
      return studentTableData;
    case "老师":
      return teacherTableData;
    case "班主任":
      return headerTeacherTableData;
    case "综测成员":
      return comprehensiveTableData;
  }
  return [];
};
