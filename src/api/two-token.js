// 双token配置
import http from "./request";
let subscribes = [];
let flag = false; // 设置开关，保证一次只能请求一次短token，防止客户多此操作，多次请求

export { REFRESH_TOKEN, PASS } from "@/constants/token";
import {
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/constants/token";

/*把过期请求添加在数组中*/
export const addRequest = (request) => {
  subscribes.push(request);
};

/*调用过期请求*/
export const retryRequest = () => {
  subscribes.forEach((request) => request());
  subscribes = [];
};

/*短token过期，携带长token去重新请求token*/
export const refreshToken = () => {
  if (!flag) {
    flag = true;
    let r_tk = getRefreshToken(); // 获取长token
    if (r_tk) {
      http
        .get("/user/refresh/" + r_tk)
        .then((res) => {
          // 长token有效 存储新的token
          setAccessToken(res.accessToken);
          setRefreshToken(res.refreshToken);
          retryRequest();
        })
        .finally(() => {
          flag = false;
        });
    }
  }
};
