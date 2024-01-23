/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-12-05 21:22:27
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-01-23 09:35:22
 * @FilePath: \collegeApplication\src\api\volunteer.js
 * @Description: 介绍文件的作用
 */
// 志愿接口
import http from "./request";

let volunteerFun = {
  basis:{},
  student:{},
  options:{},
};

/**
 * 查看班级志愿
 */
 volunteerFun.basis.getClassWish = () => {
  return http.get("/wish/selectClassWish");
};

/**
 * 学生查看志愿
 */
volunteerFun.student.selectWish = () => {
  return http.get("/wish/selectWish");
};

/**
 * 学生填写志愿
 */
volunteerFun.student.addWish = (params) => {
  return http.post("/wish/addWish",params);
};


/**
 * 修改个人志愿
 */
volunteerFun.basis.modifyWise = (params) => {
  return http.put("/wish/modifyWise",params);
};

/**
 * 查看学生选择专业范围
 */
 volunteerFun.options.selectStudentMajor = () => {
  return http.get("/wish/selectStudentMajor");
};
export default volunteerFun;