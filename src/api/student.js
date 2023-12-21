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
  sign: {},
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
 * 上传电子签名
 */
studentFun.sign.submitSignature = (base64Url) => {
  return http.post("/appraisal/signature", base64Url);
};
export default studentFun;