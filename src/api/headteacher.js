// 班级管理
import http from "./request";

let headteacherFun = {
  user: {},
};
/**
 * 获取班级学生信息
 */
 headteacherFun.user.getStudents = () => {
  return http.get("/class");
};
export default headteacherFun;