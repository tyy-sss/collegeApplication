
import http from "./request";

let apiFun = {
  user: {},
  test: {}
};

/**
 * 登录
 * @param {} data
 * @returns
 */
apiFun.user.login = () => {
  return http.get("/user/get/?id="+1)
}

export default apiFun;