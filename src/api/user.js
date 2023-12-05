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
  return http.post("/user/refresh", localStorage.getItem("refreshToken"));
};
/**
 * 退出登录
 */
apiFun.user.loginOut = () => {
  return http.get('/user/loginOut');
}
export default apiFun;
