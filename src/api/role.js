// 权限管理
import http from "./request";

let roleFun = {
  user: {},
};

// 获取所有角色的信息
roleFun.user.getAllRole = () => {
  return http.get("/role/allRole");
};
/**
 * 获取一个角色的所有用户信息
 * @param {*} roleId 
 * @param {*} pageNum 
 * @param {*} pageSize 
 * @returns 
 */
roleFun.user.getUserByRole = (roleId,pageNum,pageSize) =>{
  return http.get("/role/userList/"+roleId,{pageNum,pageSize})
}
/**
 * 修改用户的角色
 * @param {*} userId 
 * @param {*} roleId 
 * @returns 
 */
roleFun.user.changeUserRole = (userId,roleId) =>{
  return http.put("/role/permission/"+userId+'?roleId='+roleId);
}
export default roleFun;
