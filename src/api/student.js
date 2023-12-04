// 学生接口
import http from "./request";

let apiFun = {
  user: {},
  test: {},
};

/**
 * 批量上传学生数据
 * @param {} data
 * @returns
 */
apiFun.user.addStudentsByExcel = (data) => {
  return http.post("/user/students", data);
};
export default apiFun;
