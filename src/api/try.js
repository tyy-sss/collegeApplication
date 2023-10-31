/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-10-31 19:41:11
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-10-31 21:25:28
 * @FilePath: \college-application\src\api\try.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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