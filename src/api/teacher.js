/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-12-05 21:22:27
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-18 22:30:58
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
  return http.get(
    `/adviser/students?keyword=${params.keyword}&role=${params.role}&rank=${params.rank}&current=${params.current}&size=${params.size}`
  );
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
 * 班主任按月份获取综测签名确认进度
 */
teacherFun.assessment.getAssessmentsProcess = (params) => {
  return http.get(`/adviser/appraisal/state?month=${params.month}`);
};

/**
 * 班主任获取分页综测信息
 */
teacherFun.assessment.getAssessments = (params) => {
  return http.get(
    `/adviser/appraisal?keyword=${params.keyword}&month=${params.month}&identity=${params.identity}&current=${params.current}&size=${params.size}`
  );
};

/**
 * 班主任修改某月综测进度
 */
 teacherFun.assessment.updateAssessmentState = (params) => {
  return http.put(`/adviser/end?month=${params.month}&end=${params.end}`);
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
teacherFun.complaint.getAssessments = () => {
  return http.get(`/adviser/appeals`);
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
 * 班主任获取本班综测小组成员
 */
teacherFun.assessment.getAssessmentStudent = () => {
  return http.get(`/adviser/appraisal/team`);
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

/**
 * 获取班级成员志愿情况
 */
teacherFun.wish.getClassWish = (params) => {
  return http.get(
    `/wish/selectClassWish?timeId=${params.timeId}&current=${params.current}&size=${params.size}`
  );
};
export default teacherFun;
