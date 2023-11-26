// 导出文件信息

import { reactive } from "vue";

// 学生信息文件导出头行
const studentHeader = {
  uId: "学号",
  name: "姓名",
  sex: "性别",
  identity: "身份证号",
  politicalStatus: "政治面貌",
  ethnicGroup: "民族",
  class: "班级",
  targetSchool: "目标学校",
  province: "来源省份",
  electiveSubject: "选考科目",
  natureProgram: "计划性质",
  homeAddress: "家庭地址",
  phone: "联系电话",
  parentPhone: "父母电话",
};
// 学生信息模板第一行信息
const studentModelData = [
  {
    uId: "1",
    name: "张三",
    sex: "男",
    identity: "4xxxxx199901010022",
    politicalStatus: "团员",
    ethnicGroup: "土家族",
    class: "2022级预科1班",
    targetSchool: "吉首大学",
    province: "湖南省张家界市",
    electiveSubject:
      "物理+化学+地理（中间连接符可以使用 “ '*' '+' '，' '.' '&' ” ）",
    natureProgram: "国家计划",
    homeAddress: "湖南省张家界市",
    phone: "1xxxxxxxxxx",
    parentPhone: "1xxxxxxxxxx",
  },
];

// 老师信息文件导出头行
const teacherHeader = {
  uId: "工号",
  name: "姓名",
  sex: "性别",
  politicalStatus: "政治面貌",
  ethnicGroup: "民族",
  phone: "联系电话",
};
// 学生信息模板第一行信息
const teacherModelData = reactive([
  {
    uId: "1",
    name: "张三",
    sex: "男",
    politicalStatus: "团员",
    ethnicGroup: "汉族",
    phone: "1xxxxxxxxxx",
  },
]);

export { studentHeader, studentModelData, teacherHeader, teacherModelData };
