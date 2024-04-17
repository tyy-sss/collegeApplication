/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-12-05 21:22:27
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-28 15:36:50
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
volunteerFun.basis.modifyWise = (params, formData) => {
  return http.upload2(
    `/wish/modifyWish?first=${params.first}&firstName=${params.firstName}&second=${params.second}&secondName=${params.secondName}&third=${params.third}&thirdName=${params.thirdName}&timeId=${params.timeId}`,
    formData
  );
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
 * @param {是否重新生成} type1
 * @returns
 */
volunteerFun.manager.volunteerDiversion = (data) => {
  return http.post("/volunteerDiversion/Mate", {
    schoolId: data.schoolId,
    type: data.type,
    timeId: data.timeId,
    type1: data.type1,
  });
};
/**
 * 查看志愿匹配数据
 * @param {*} schoolId
 * @param {*} timeId
 * @param {*} mateWay
 * @param {*} type
 * @returns
 */
volunteerFun.manager.exportVolunteerDiversion = (
  schoolId,
  timeId,
  mateWay,
  type
) => {
  return http.get("/volunteerDiversion/getResult", {
    schoolId,
    timeId,
    mateWay,
    type,
  });
};
/**
 * 获取没有匹配完的专业信息
 * @param {*} type
 * @param {*} timeId
 * @returns
 */
volunteerFun.manager.getRemainMajor = (type, timeId) => {
  return http.get("/volunteerDiversion/getAdmissionsMajor", {
    type,
    timeId,
  });
};
/**
 * 分页查看志愿匹配数据
 * @param {*} schoolId
 * @param {*} timeId
 * @param {*} mateWay
 * @param {*} current
 * @param {*} size
 * @param {*} type
 * @returns
 */
volunteerFun.manager.checkVolunteerDiversion = (data) => {
  return http.get("/volunteerDiversion/getResult1", {
    schoolId: data.schoolId,
    timeId: data.timeId,
    mateWay: data.mateWay,
    current: data.current,
    size: data.size,
    type: data.type,
  });
};
/**
 * 上传最后的分流结果
 * @param {*} data
 * @returns
 */
volunteerFun.manager.uploadResult = (data) => {
  return http.post("/volunteerDiversion/uploadResult", data);
};
/**
 * 查看最后的分流结果
 * @param {*} data
 * @returns
 */
volunteerFun.manager.checkAllEndVolunteerDiversion = (data) => {
  return http.get("/volunteerDiversion/getResult2", {
    schoolId: data.schoolId,
    timeId: data.timeId,
  });
};
/**
 * 分页查看最后的分流结果
 * @param {*} data
 * @returns
 */
volunteerFun.manager.checkEndVolunteerDiversion = (data) => {
  return http.get("/volunteerDiversion/getPagingResult", {
    schoolId: data.schoolId,
    timeId: data.timeId,
    current: data.current,
    size: data.size,
  });
};
/**
 * 查看没有填写志愿的人员名单
 * @param {时间志愿id} timeId
 * @returns
 */
volunteerFun.manager.checkUnAccepted = (timeId) => {
  return http.get("/wishTime/selectNotAccepted?timeId=" + timeId);
};
export default volunteerFun;
