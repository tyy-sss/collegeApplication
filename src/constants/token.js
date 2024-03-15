export const ACCESS_TOKEN = "a_tk"; // 短token字段
export const REFRESH_TOKEN = "r_tk"; // 短token字段
export const AUTH = "Authorization"; // header头部 携带短token
export const PASS = "pass"; // header头部 携带长token
export const ROLE = "role";

// 存储短token
export const setAccessToken = (token) => {
  localStorage.setItem(ACCESS_TOKEN, token);
};
// 存储长token
export const setRefreshToken = (token) => {
  localStorage.setItem(REFRESH_TOKEN, token);
};
// 保存身份
export const setRole = (role) => {
  localStorage.setItem(ROLE, role);
};
// 获取短token
export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};
// 获取长token
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};
// 获得
export const getRole = () => {
  return localStorage.getItem(ROLE);
};

// 删除短token
export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};
// 删除长token
export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN);
};
// 删除
export const removeRole = () => {
  localStorage.removeItem(ROLE);
};
