import request from "./request";

/**
 * 登录
 * @param {} data
 * @returns
 */
export const login = () => {
  return request({
    url: "/user/get/?id="+1,
    method: "get",
  });
};
