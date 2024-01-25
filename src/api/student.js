/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-12-06 20:57:50
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-01-25 21:11:19
 * @FilePath: \collegeApplication\src\api\student.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "./request";

let studentFun = {
  user: {},
  sign: {},
  assess: {},
  complaint: {},

};

/**
 * 学生获取个人信息
 */
studentFun.user.getInformation = () => {
  return http.get("/student/information");
};

/**
 * 学生修改个人信息（电话以及收件信息）
 */
studentFun.user.updateInformation = (params) => {
  return http.put("/student/information", params);
};

/**
 * 学生修改密码
 */
studentFun.user.updatePassword = (password) => {
  return http.put("/student/password", password);
};

/**
 * 学生上传证件照
 */
studentFun.user.setIDPhoto = (formData) => {
  return http.upload("/user/headshot", formData);
};

/**
 * 学生获取申诉
 */
studentFun.complaint.getComplaints = (params) => {
  return http.get(`/student/appeal?state=${params.state}&current=${params.current}&size=${params.size}`);
};
/**
 * 学生申诉
 */
studentFun.complaint.submitComplaint = (params) => {
  return http.post(`/student/appeal`, params);
};
/**
 * 删除已完成申诉
 */
studentFun.complaint.deleteComplaint = (params) => {
  return http.delete(`/student/appeal`, params);
};

/**
 * 撤销申诉
 */
studentFun.complaint.revokeComplaint = (params) => {
  return http.put(`/student/appeal`, params);
};

/**
 * 获取本月学生个人的综测情况
*/
studentFun.assess.getAssessmentThisMonth = () => {
  return http.get(`/student/this`);
};

/**
 * 获取学生个人的综测情况(按月份)
*/
studentFun.assess.getAssessmentByMonth = (params) => {
  return http.get(`/student?month=${params.month}`);
};

/**
 * 上传电子签名
 */
studentFun.sign.submitSignature = (base64Url) => {
  return http.post("/appraisal/signature", base64Url);
};

/**
 * 综测小组获取本月学生综测
 */
studentFun.assess.getAssessments = (params) => {
  return http.get(`/appraisal-team/appraisal/this?name=${params.name}&userNumber=${params.userNumber}&rank=${params.rank}&current=${params.current}&size=${params.size}`);
};

/**
 * 综测小组根据月份获取学生综测
 */
studentFun.assess.getAssessmentsByMonth = (params) => {
  return http.get(`/appraisal-team/appraisal?name=${params.name}&userNumber=${params.userNumber}&month=${params.month}&rank=${params.rank}&current=${params.current}&size=${params.size}`);
};

/**
 * 综测小组上传学生综测信息
 */
studentFun.assess.submitAssessments = (params) => {
  return http.post(`/appraisal-team/appeal`, params);
};

/**
 * 综测小组获取学生申诉
 */
studentFun.assess.getComplaint = (params) => {
  return http.get(`/appraisal-team/appeals?state=${params.state}`);
};

/**
 * 综测小组删除学生申诉
 */
studentFun.assess.deleteComplaint = (params) => {
  return http.delete(`/appraisal-team/appeals`, params);
};

/**
 * 综测小组处理学生申诉
 */
studentFun.assess.dealComplaint = (params) => {
  return http.put(`/appraisal-team/appeal`, params);
};

export default studentFun;