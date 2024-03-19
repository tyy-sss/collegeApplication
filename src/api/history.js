import http from "./request";

let historyFun = {
  manager: {},
};
/**
 * 查询历史综测信息
 * @param {*} data 
 * @returns 
 */
historyFun.manager.appraisal = (data) => {
  return http.get("/appraisal/history", {
    year: data.year,
    month: year.month,
    className: data.className,
    keyword: data.keyword,
    current: data.current,
    size: data.size,
  });
};

export default historyFun;