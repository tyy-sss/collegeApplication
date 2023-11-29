import http from "./request";

let apiFun = {
  user: {},
  test: {},
};

/**
 * 登录
 * @param {} data
 * @returns
 */
apiFun.user.login = (data) => {
  return http.post("/user/login", data);
};
/**
 * 刷新token
 */
apiFun.user.refreshToken = () => {
  return http.post("/user/refresh-token", localStorage.getItem("refreshToken"));
};
export default apiFun;
