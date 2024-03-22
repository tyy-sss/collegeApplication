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
    month: year.month,
    className: data.className,
    keyword: data.keyword,
    current: data.current,
    size: data.size,
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
    className: data.className,
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
  return http.get("/class/student?classId="+classId);
};
export default historyFun;
