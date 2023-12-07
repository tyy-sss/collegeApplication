// 用户管理
import http from "./request";

let managerFun = {
  user: {},
  class: {},
  school: {},
  area: {},
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
  return http.get("/class/exists", { className });
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
managerFun.class.changeClass = (classId, userNumber, className) => {
  return http.put("/class", { classId, userNumber, className });
};
/**
 * 删除班级
 * @param {*} data 班级编号数组
 */
managerFun.class.deleteClass = (data) => {
  return http.delete("/class", data);
};
/**
 * 学校名查重
 * @param {*} name
 * @returns
 */
managerFun.school.existsSchool = (schoolName) => {
  return http.get("/school/exists", { schoolName });
};
/**
 * 搜索学校
 * @param {*} schoolName
 * @returns
 */
managerFun.school.searchSchool = (schoolName) => {
  return http.get("/school", { schoolName });
};
/**
 * 添加学校
 * @param {*} data
 * @returns
 */
managerFun.school.addSchool = (data) => {
  return http.post("/school", data);
};
/**
 * 修改学校信息
 * @param {*} data
 * @returns
 */
managerFun.school.changeSchool = (data) => {
  return http.put("/school", data);
};
/**
 * 删除学校
 * @param {*} number 学校编号
 */
managerFun.school.deleteSchool = (number) => {
  return http.delete("/school", number);
};
/**
 * 搜索组合
 * @param {组合名} name 
 * @returns 
 */
managerFun.area.selectArea = (name) => {
  return http.get("/area/selectArea?name="+name);
};
/**
 * 添加地址组合
 * @param {地区对象} data
 */
managerFun.area.addArea = (data) => {
  return http.post("/area/addArea", data);
};
/**
 * 修改地址组合
 * @param {地区对象} data 
 * @returns 
 */
managerFun.area.modifyArea = (data) =>{
  return http.put('/area/modifyArea',data)
}
/**
 * 删除地址
 * @param {地址组合id} data 
 * @returns 
 */
managerFun.area.deleteArea = (data) =>{
  return http.delete("area?areaIds="+data)
}
export default managerFun;
