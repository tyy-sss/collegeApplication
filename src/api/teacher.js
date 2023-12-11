// 班级管理
import http from "./request";

let teacherFun = {
  user: {},
};
/**
 * 老师获取个人信息
 */
teacherFun.user.getInformation = () => {
  return http.get("/teacher/information");
};
/**
 * 老师修改电话号码
 */
teacherFun.user.getInformation = () => {
  return http.put("/teacher/phone");
};
export default teacherFun;