// 双token配置
import http from "./request";
let flag = false; // 设置开关，保证一次只能请求一次短token，防止客户多此操作，多次请求
export { REFRESH_TOKEN,PASS } from "@/config/constants";
import { getRefreshToken, removeRefreshToken, setAccessToken, setRefreshToken } from "@/config/constants";

/*把过期请求添加在数组中*/
export const addRequest = (request) => {
  subscribes.push(request);
};

/*调用过期请求*/
export const retryRequest = () => {
  console.log("重新请求上次中断的数据");
  subscribes.forEach((request) => request());
  subscribes = [];
};

/*短token过期，携带长token去重新请求token*/
export const refreshToken = async () => {
  if (!flag) {
    flag = true;
    let r_tk = getRefreshToken(); // 获取长token
    if (r_tk) {
      const res = await http.get("/user/refresh_token", r_tk);
      //长token失效，退出登录
      if (res.code === 4006) {
        flag = false;
        removeRefreshToken()
      } else if (res.code === 200) {
        // 存储新的token
        setAccessToken(data.token.accessToken)
        setRefreshToken(data.token.refreshToken)
        flag = false;
        // 重新请求数据
        retryRequest();
      }
    }
  }
};
