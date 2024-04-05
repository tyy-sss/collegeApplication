import http from "./request";

let historyFun = {
  manager: {},
};
/**
 * 查询历史综测信息
 * @param {*} data
 * @returns
 */
historyFun.manager.appraisal = (data) => {
  return http.get("/appraisal/history", {
    year: data.year,
    month: data.month,
    classId: data.classId,
    keyword: data.keyword,
    current: data.current,
    size: data.size,
  });
};
/**
 * 获取一个班一个月的综测成绩
 * @param {*} data
 * @returns
 */
historyFun.manager.appraisalByClass = (data) => {
  return http.get("/appraisal/class", {
    classId: data.classId,
    month: data.month,
    year: data.year,
  });
};
/**
 * 查询学生历史信息
 * @param {*} data
 * @returns
 */
historyFun.manager.student = (data) => {
  return http.get("/student/history", {
    year: data.year,
    classId: data.className,
    keyword: data.keyword,
    current: data.current,
    size: data.size,
  });
};
/**
 * 获取一个班级所有的学生信息
 * @param {*} classId
 * @returns
 */
historyFun.manager.getStudentByClass = (classId) => {
  return http.get("/class/student?classId=" + classId);
};
export default historyFun;
