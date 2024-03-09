// 权限管理
import http from "./request";

let roleFun = {
  user: {},
};

// 获取所有角色的信息
roleFun.user.getAllRole = () => {
  return http.get("/role/allRole");
};

export default roleFun;
