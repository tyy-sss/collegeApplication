/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-12-06 20:57:50
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-11 19:49:22
 * @FilePath: \collegeApplication\src\api\student.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "./request";

let studentFun = {
  user: {},
};
/**
 * 学生获取个人信息
 */
studentFun.user.getInformation = () => {
  return http.get("/student/information");
};

/**
 * 学生修改个人信息（收件信息）
 */
studentFun.user.updateInformation = (params) => {
  return http.put("/student/information",params);
};

/**
 * 获取班级成员列表
 */
 studentFun.user.updateInformation = (params) => {
  return http.get(`/adviser/students?classId=${params.classId}&userNumber=${params.userNumber}&username=${params.username}&role=${params.role}&current=${params.current}&size=${params.size}`);
};

/**
 * 班主任获取学生个人信息
 */
 studentFun.user.getStudentInformation = (params) => {
  return http.get(`/adviser/student?number=${params.number}`);
};

/**
 * 班主任修改学生个人信息
 */
 studentFun.user.updateStudentInformation = (params) => {
  return http.get(`/adviser/student`,params);
};
export default studentFun;