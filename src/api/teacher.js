/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-12-05 21:22:27
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-21 20:02:03
 * @FilePath: \collegeApplication\src\api\teacher.js
 * @Description: 介绍文件的作用
 */
// 班级管理
import http from "./request";

let teacherFun = {
  user: {},
  class: {},
  assessment:{},
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
teacherFun.user.updatePhone = () => {
  return http.put("/teacher/phone");
};

/**
 * 老师修改密码
 */
teacherFun.user.updatePassword = () => {
  return http.put("/teacher/password");
};

/**
 * 获取班级成员列表
 */
teacherFun.class.updateInformation = (params) => {
  return http.get(`/adviser/students?classId=${params.classId}&userNumber=${params.userNumber}&username=${params.username}&role=${params.role}&current=${params.current}&size=${params.size}`);
};

/**
 * 班主任获取学生个人信息
 */
teacherFun.class.getStudentInformation = (params) => {
  return http.get(`/adviser/student?number=${params.number}`);
};

/**
 * 班主任修改学生个人信息
 */
teacherFun.class.updateStudentInformation = (params) => {
  return http.put(`/adviser/student`, params);
};

/**
 * 班主任重置学生密码
 */
 teacherFun.class.updateStudentPassword = (params) => {
  return http.put(`/adviser/reset`, params);
};

/**
 * 班主任重置学生密码
 */
 teacherFun.assessment.getAssessments = (params) => {
  return http.get(`/adviser/appraisal?name=${params.name}&userNumber=${params.userNumber}&month=${params.month}&rank=${params.rank}&current=${params.current}&size=${params.size}`);
};
export default teacherFun;