// 班级管理
import http from "./request";

let managerClassFun = {
  user: {},
  test: {},
};
/**
 * 创建班级
 * @param {*} userNumver
 * @param {*} className
 */
managerClassFun.user.addClass = (userNumber, className) => {
  return http.post("/class", { userNumber, className });
};
export default managerClassFun;
