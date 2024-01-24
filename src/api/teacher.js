/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-12-05 21:22:27
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-01-24 20:33:47
 * @FilePath: \collegeApplication\src\api\teacher.js
 * @Description: 介绍文件的作用
 */
// 班级管理
import http from "./request";

let teacherFun = {
  user: {},
  class: {},
  assessment: {},
  complaint: {},
  post: {},
  wish: {},

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
teacherFun.user.updatePhone = (phone) => {
  return http.put("/teacher/phone", phone);
};

/**
 * 老师修改密码
 */
teacherFun.user.updatePassword = (password) => {
  return http.put("/teacher/password", password);
};

/**
 * 获取班级成员列表
 */
teacherFun.class.updateInformation = (params) => {
  return http.get(`/adviser/students?userNumber=${params.userNumber}&username=${params.username}&role=${params.role}&rank=${params.rank}&current=${params.current}&size=${params.size}`);
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
 * 班主任获取分页综测信息
 */
teacherFun.assessment.getAssessments = (params) => {
  return http.get(`/adviser/appraisal?name=${params.name}&userNumber=${params.userNumber}&month=${params.month}&identity=${params.identity}&current=${params.current}&size=${params.size}`);
};

// /**
//  * 班主任修改班级成员身份
//  */
// teacherFun.assessment.getAssessments = (params) => {
//   return http.put("/adviser/modify-identity", params);
// };

/**
 * 班主任修获取班级内的申诉
 */
teacherFun.complaint.getAssessments = (params) => {
  return http.get(`/adviser/appeals?state=${params.state}`);
};

/**
 * 班主任删除已完成/已取消申述
 */
teacherFun.complaint.deleteComplaint = (params) => {
  return http.delete(`/adviser/appeal`, params);
};

/**
 * 班主任处理申述
 */
teacherFun.complaint.dealComplaint = (params) => {
  return http.put(`/adviser/appeal`, params);
};

/**
 * 班主任重置测评小组学生密码
 */
teacherFun.class.updateAssessPassword = (params) => {
  return http.put(`/adviser/appraisal/team?userNumber=${params.userNumber}`);
};

/**
 * 班主任撤销测评小组学生身份（批量）
 */
teacherFun.class.deleteAssessPost = (params) => {
  return http.delete(`/adviser/appraisal/team/revocation`, params);
};
/**
 * 班主任设置测评小组学生身份
 */
teacherFun.class.setAssessPost = (params) => {
  return http.post(`/adviser/appraisal/team`, params);
};

/**
 * 班主任平均分配班级成员
 */
teacherFun.class.averageAllocated = () => {
  return http.post(`/adviser/appraisal/class/average`);
};

/**
 * 班主任撤销分配班级成员
 */
teacherFun.class.revokeAllocated = () => {
  return http.delete(`/adviser/appraisal/class/revocation`);
};

teacherFun.wish.getClassWish = (params) => {
  return http.get(`/wish/selectClassWish?timeId=${params.timeId}`)
}
export default teacherFun;