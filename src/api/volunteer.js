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
  return http.post("/wish/addWish",params);
};


/**
 * 修改个人志愿
 */
volunteerFun.basis.modifyWise = (params) => {
  return http.put("/wish/modifyWish",params);
};

/**
 * 查看学生选择专业范围
 */
 volunteerFun.options.selectStudentMajor = () => {
  return http.get("/wish/selectStudentMajor");
};
export default volunteerFun;