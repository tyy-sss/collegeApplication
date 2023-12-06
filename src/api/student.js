/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-12-06 20:57:50
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-06 21:00:30
 * @FilePath: \collegeApplication\src\api\student.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "./request";

let studentFun = {
  user: {},
};
/**
 * 获取班级学生信息
 */
studentFun.user.getStudents = () => {
  return http.get("/class");
};
export default studentFun;