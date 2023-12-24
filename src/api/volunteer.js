/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-12-05 21:22:27
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-24 11:19:10
 * @FilePath: \collegeApplication\src\api\volunteer.js
 * @Description: 介绍文件的作用
 */
// 志愿接口
import http from "./request";

let volunteerFun = {
  basis:{},
  student:{},

};

/**
 * 学生查看志愿
 */
 volunteerFun.student.selectWish = () => {
  return http.post("/wish/selectWish");
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


export default volunteerFun;