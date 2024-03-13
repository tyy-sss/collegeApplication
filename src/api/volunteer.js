/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-12-05 21:22:27
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-11 20:29:11
 * @FilePath: \collegeApplication\src\api\volunteer.js
 * @Description: 介绍文件的作用
 */
// 志愿接口
import http from "./request";

let volunteerFun = {
  basis: {},
  student: {},
  options: {},
  manager: {},
};

/**
 * 查看班级志愿
 */
volunteerFun.basis.getClassWish = () => {
  return http.get("/wish/selectClassWish");
};

/**
 * 学生查看志愿列表
 */
 volunteerFun.student.getWishTable = () => {
  return http.get("/wishTime/selectWishTime2");
};

/**
 * 学生查看志愿
 */
volunteerFun.student.selectWish = (timeId) => {
  return http.get(`/wish/selectWish?timeId=${timeId}`);
};

/**
 * 学生填写志愿
 */
volunteerFun.student.addWish = (params) => {
  return http.post("/wish/addWish", params);
};

/**
 * 修改个人志愿
 */
volunteerFun.basis.modifyWise = (params) => {
  return http.put("/wish/modifyWish", params);
};

/**
 * 查看学生选择专业范围
 */
volunteerFun.options.selectStudentMajor = () => {
  return http.get("/wish/selectStudentMajor");
};
/**
 * 进行志愿匹配
 * @param {学校id} schoolId
 * @param {志愿匹配方式} type 1第一志愿 2平行志愿
 * @param {匹配时间id} timeId
 * @returns
 */
volunteerFun.manager.volunteerDiversion = (schoolId, type, timeId) => {
  return http.post("/volunteerDiversion/Mate", {
    schoolId,
    type,
    timeId,
  });
};
/**
 * 查看志愿匹配数据
 * @param {*} schoolId
 * @param {*} timeId
 * @param {*} mateWay
 * @param {*} current
 * @param {*} size
 * @returns
 */
volunteerFun.manager.checkVolunteerDiversion = (data) => {
  return http.get("/volunteerDiversion/getResult1", {
    schoolId: data.schoolId,
    timeId: data.timeId,
    mateWay: data.mateWay,
    current: data.current,
    size: data.size,
  });
};
export default volunteerFun;
