// 班级管理
import http from "./request";

let teacherFun = {
  user: {},
};
/**
 * 获取班级学生信息
 */
teacherFun.user.getStudents = () => {
  return http.get("/class");
};
export default teacherFun;