// 用户管理
import http from "./request";

let managerUserFun = {
  user: {},
  test: {},
};

/**
 * 查询用户数据
 * @param {*} username 姓名
 * @param {*} role 角色
 * @param {*} current 页码
 * @param {*} size 分页数据大小
 * @returns
 */
managerUserFun.user.searchUser = (username, role, current, size) => {
  return http.get("/user", { username, role, current, size });
};
/**
 * 批量上传学生数据
 * @param {} data
 * @returns
 */
managerUserFun.user.addStudentsByExcel = (data) => {
  return http.post("/user/students", data);
};
/**
 * 批量上传老师数据
 * @param {} data
 * @returns
 */
managerUserFun.user.addTeacherByExcel = (data) => {
  return http.post("/user/teachers", data);
};
/**
 * 获得老师的信息
 * @returns
 */
managerUserFun.user.getTeacherList = () => {
  return http.post("/user/teachers");
};
/**
 * 重置密码
 * @param {*} data 用户账号数组
 * @returns
 */
managerUserFun.user.reset = (data) => {
  return http.put("/user/reset", data);
};
/**
 * 删除用户
 * @param {*} data 用户账号数组
 */
managerUserFun.user.deleteUser = (data) => {
  return http.delete("/user", data);
};
export default managerUserFun;
