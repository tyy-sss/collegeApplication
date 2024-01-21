// 文件导出格式
import { reactive } from "vue";
// 学生信息字段对应表
export let studentCharacter = {
  userNumber: {
    text: "学号",
    type: "string",
  },
  username: {
    text: "姓名",
    type: "string",
  },
  sex: {
    text: "性别",
    type: "string",
  },
  className: {
    text: "班级",
    type: "string",
  },
  school: {
    text: "目标学校",
    type: "string",
  },
  province: {
    text: "来源省份",
    type: "string",
  },
  subjects: {
    text: "选考科目",
    type: "string",
  },
  plan: {
    text: "计划性质",
    type: "string",
  },
  object: {
    text: "文理科类",
    type: "string",
  },
};

// 老师信息文件导出头行
export let teacherCharacter = {
  userNumber: {
    text: "工号",
    type: "string",
  },
  username: {
    text: "姓名",
    type: "string",
  },
  sex: {
    text: "性别",
    type: "string",
  },
  politicsStatus: {
    text: "政治面貌",
    type: "string",
  },
  nation: {
    text: "民族",
    type: "string",
  },
  phone: {
    text: "联系电话",
    type: "string",
  },
};

// 专业限制 专业信息导出头行
export let professionInformationLimitCharacter = reactive({
  college: {
    text: "教学学院",
    type: "string",
  },
  name: {
    text: "专业名称",
    type: "string",
  },
});
