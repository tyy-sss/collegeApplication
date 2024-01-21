// 导出文件信息

import { reactive } from "vue";

// 学生信息文件导出头行
const studentHeader = {
  userNumber: "学号",
  username: "姓名",
  sex: "性别",
  className: "班级",
  school: "目标学校",
  province: "来源省份",
  subjects: "选考科目",
  plan: "计划性质",
  object:"文理科类"
};
// 学生信息模板第一行信息
const studentModelData = [
  {
    userNumber: "1",
    username: "张三",
    sex: "男",
    className: "2022级预科1班",
    school: "吉首大学",
    province: "湖南省张家界市",
    subjects: "物理+化学+地理（中间连接符可以使用 “ '*' '+' '，' '.' '&' ，'/'” ）",
    plan: "国家计划",
    object:""
  },
];

// 老师信息文件导出头行
const teacherHeader = {
  userNumber: "工号",
  username: "姓名",
  sex: "性别",
  politicsStatus: "政治面貌",
  nation: "民族",
  phone: "联系电话",
};
// 学生信息模板第一行信息
const teacherModelData = reactive([
  {
    userNumber: "1",
    username: "张三",
    sex: "男",
    politicsStatus: "团员",
    nation: "汉族",
    phone: "1xxxxxxxxxx",
  },
]);

// 专业限制 专业信息导出头行
const professionInformationLimitHeader = reactive({
  college: "教学学院",
  name: "专业名称",
});

export {
  studentHeader,
  studentModelData,
  teacherHeader,
  teacherModelData,
  professionInformationLimitHeader,
};
