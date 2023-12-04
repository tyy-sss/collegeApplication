// 老师接口
import http from "./request";

let teacherFun = {
  user: {},
  test: {},
};

/**
 * 批量上传学生数据
 * @param {} data
 * @returns
 */
teacherFun.user.addTeacherByExcel = (data) => {
  return http.post("/user/teachers", data);
};
export default teacherFun;
 