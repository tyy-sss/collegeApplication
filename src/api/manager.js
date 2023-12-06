// 用户管理
import http from "./request";

let managerFun = {
  user: {},
  class: {},
};

/**
 * 查询用户数据
 * @param {*} username 姓名
 * @param {*} role 角色
 * @param {*} current 页码
 * @param {*} size 分页数据大小
 * @returns
 */
managerFun.user.searchUser = (username, role, current, size) => {
  return http.get("/user", { username, role, current, size });
};
/**
 * 批量上传学生数据
 * @param {} data
 * @returns
 */
managerFun.user.addStudentsByExcel = (data) => {
  return http.post("/user/students", data);
};
/**
 * 批量上传老师数据
 * @param {} data
 * @returns
 */
managerFun.user.addTeacherByExcel = (data) => {
  return http.post("/user/teachers", data);
};
/**
 * 重置密码
 * @param {*} data 用户账号数组
 * @returns
 */
managerFun.user.reset = (data) => {
  return http.put("/user/reset", data);
};
/**
 * 删除用户
 * @param {*} data 用户账号数组
 */
managerFun.user.deleteUser = (data) => {
  return http.delete("/user", data);
};
/**
 * 获得老师的信息
 * @returns
 */
managerFun.user.getTeacherList = () => {
  return http.get("/user/teachers");
};
managerFun.class.searchClass = (year, current, size) => {
  return http.get("/class", { year, current, size });
};
/**
 * 班级名查重
 * @param {*} className
 * @returns
 */
managerFun.class.existsClass = (className) => {
  return http.get("/class/exists", {className});
};
/**
 * 创建班级
 * @param {*} userNumber
 * @param {*} className
 */
managerFun.class.addClass = (userNumber, className) => {
  return http.post("/class", { userNumber, className });
};
/**
* 修改班级信息
* @param {*} userNumver
* @param {*} className
*/
managerFun.class.changeClass = (userNumber,className) =>{
  return http.put("/class",{ userNumber,className })
}
/**
 * 删除班级
 * @param {*} data 班级编号数组
 */
managerFun.class.deleteClass = (data) =>{
  return http.delete("/class",data)
}
export default managerFun;
